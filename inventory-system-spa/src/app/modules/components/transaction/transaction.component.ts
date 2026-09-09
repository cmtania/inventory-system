import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { HideSpinner, ShowSpinner } from '../../state-management/actions/spinner.action';
import { Store } from '@ngxs/store';
import { Subject, Subscription, take, tap, finalize, debounceTime, distinctUntilChanged } from 'rxjs';
import { ProductModel } from '../../model/product.model';
import { InventoryModel } from '../../model/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { Cart, Transaction } from '../../model/transaction.model';
import { PaymentTypeModel } from '../../model/payment-type.model';
import { PaymentTypeService } from '../../services/payment-type.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  standalone: false,
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit, OnDestroy {

  transactionForm: FormGroup;
  searchTerm: string = '';
  currentDate = new Date(); // Add current date property

  // Debounced search + O(1) product-index lookup keep keystrokes snappy
  private readonly searchSubject = new Subject<string>();
  private searchSub?: Subscription;
  private readonly productIndexMap = new Map<any, number>();

  // Stock on hand per product, and the transient "over stock" warning
  private readonly stockMap = new Map<any, number>();
  stockError: string | null = null;
  private stockErrorTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private fb: FormBuilder,
    private readonly _productService: ProductService,
    private readonly _store: Store,
    private readonly _inventoryService: InventoryService,
    private readonly _paymentTypeService: PaymentTypeService){
      this.transactionForm = this.fb.group({
        carts: this.fb.array([]),
        products: this.fb.array([]),
        details: this.fb.group({
          ItemCount: [0],
          Total: [0],
          PaymentTypeId: [null, Validators.required],
        })
      });
  }

  productList = new Array<ProductModel>();
  filteredProducts = new Array<any>();
  currentPage: number = 1;
  inventoryItems = new Array<InventoryModel>();
  paymentTypes = new Array<PaymentTypeModel>();

  transaction = new Transaction( new Array<Cart>());

  ngOnInit(): void {
    this.searchSub = this.searchSubject
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(() => this.applyFilter());
    this.loadInventory();
    this.loadPaymentTypes();
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
    clearTimeout(this.stockErrorTimer);
  }

  get carts(): FormArray {
    return this.transactionForm.get('carts') as FormArray;
  }

  get products(): FormArray {
    return this.transactionForm.get('products') as FormArray;
  }

  get details(): FormGroup {
    return this.transactionForm.get('details') as FormGroup;
  }

  addToCart(item: any, index: number): void {
    const unitPrice = this.getProductValue(index, 'UnitPrice');
    const quantity = this.getProductValue(index, 'Quantity');
    const productId = this.getProductValue(index, 'ProductId');
    const productName = this.getProductValue(index, 'ProductName');

    const stock = this.stockMap.get(productId) ?? 0;
    const addQty = this.num(quantity);
    const alreadyInCart = this.cartQtyForProduct(productId);

    if (stock <= 0) {
      this.showStockError(`"${productName}" is out of stock.`);
      return;
    }

    if (alreadyInCart + addQty > stock) {
      const remaining = Math.max(0, stock - alreadyInCart);
      this.showStockError(
        `Cannot add ${addQty} × "${productName}" — only ${remaining} of ${stock} in stock` +
        (alreadyInCart ? ` (${alreadyInCart} already in cart).` : '.')
      );
      return;
    }

    // If the product is already in the cart, top up that line instead of duplicating it
    const existing = this.carts.controls.find(c => c.get('ProductId')?.value === productId);
    if (existing) {
      const newQty = this.num(existing.get('Quantity')?.value) + addQty;
      existing.get('Quantity')?.setValue(newQty);
      existing.get('RowTotal')?.setValue(newQty * this.num(existing.get('UnitPrice')?.value));
      this.dismissStockError();
      this.calculateTotal();
      return;
    }

    const selectedItem = this.fb.group({
      ItemId: [this.carts.length + 1],
      ProductId: [productId],
      ProductName: [productName],
      Description: [this.getProductValue(index, 'Description')],
      Quantity: [addQty, Validators.required],
      UnitPrice: [unitPrice],
      RowTotal: [(+unitPrice * addQty)]
    });

    this.carts.push(selectedItem);
    this.dismissStockError();
    this.calculateTotal();
  }

  private cartQtyForProduct(productId: any): number {
    return this.carts.controls.reduce(
      (sum, c) => c.get('ProductId')?.value === productId ? sum + this.num(c.get('Quantity')?.value) : sum,
      0
    );
  }

  private showStockError(message: string): void {
    this.stockError = message;
    clearTimeout(this.stockErrorTimer);
    this.stockErrorTimer = setTimeout(() => (this.stockError = null), 5000);
  }

  dismissStockError(): void {
    this.stockError = null;
    clearTimeout(this.stockErrorTimer);
  }

  private num(value: any): number {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  deleteCartItem(index: number): void {
    this.carts.removeAt(index);
    this.calculateTotal();
  }

  quantityChange(index: number): void {
    const line = this.carts.at(index);
    const control = line.get('Quantity');
    const unitPrice = line.get('UnitPrice');
    const productId = line.get('ProductId')?.value;
    const productName = line.get('ProductName')?.value;

    let qty = Math.floor(this.num(control?.value));
    if (qty < 1) {
      qty = 1;
    }

    const stock = this.stockMap.get(productId);
    if (stock != null) {
      const otherLines = this.cartQtyForProduct(productId) - this.num(control?.value);
      if (otherLines + qty > stock) {
        qty = Math.max(1, stock - otherLines);
        this.showStockError(`Adjusted to ${qty} — only ${stock} of "${productName}" in stock.`);
      }
    }

    control?.setValue(qty, { emitEvent: false });

    const rowTotal = qty * this.num(unitPrice?.value);
    line.get('RowTotal')?.setValue(rowTotal);
    this.calculateTotal();
  }

  decreaseQuantity(index: number): void {
    const control = this.carts.at(index).get('Quantity');
    if (control && control.value > 1) {
      control.setValue(control.value - 1);
      this.quantityChange(index);
    }
  }

  increaseQuantity(index: number): void {
    const line = this.carts.at(index);
    const control = line.get('Quantity');
    if (!control) {
      return;
    }

    const productId = line.get('ProductId')?.value;
    const stock = this.stockMap.get(productId);
    const next = this.num(control.value) + 1;

    if (stock != null) {
      const otherLines = this.cartQtyForProduct(productId) - this.num(control.value);
      if (otherLines + next > stock) {
        this.showStockError(`Only ${stock} of "${line.get('ProductName')?.value}" in stock.`);
        return;
      }
    }

    control.setValue(next);
    this.quantityChange(index);
  }


  getProducts() {
     this._store.dispatch(new ShowSpinner());
     this._productService.getProducts().pipe(
      take(1),
      tap((resp: any) => {
        if (resp.IsOk) {
          this.productList = resp.Results[0];
          return;
        }
      }),
      finalize(() => {
        this._store.dispatch(new HideSpinner());
      })
    ).subscribe();
  }

  // Called from the template on every keystroke — just feeds the debounced stream
  filterProducts() {
    this.searchSubject.next(this.searchTerm);
  }

  private applyFilter() {
    const term = this.searchTerm.trim().toLowerCase();

    const source = !term
      ? this.inventoryItems
      : this.inventoryItems.filter(item =>
          (item.ProductName?.toLowerCase().includes(term) ?? false) ||
          (item.ProductCode?.toLowerCase().includes(term) ?? false) ||
          (item.ProductDescription?.toLowerCase().includes(term) ?? false) ||
          (item.Brand?.toLowerCase().includes(term) ?? false) ||
          (item.Category?.toLowerCase().includes(term) ?? false)
        );

    this.filteredProducts = this.buildProductView(source);
  }

  // Flatten each product into a plain view-model so the template does pure
  // property reads (no method calls) on every change-detection pass.
  private buildProductView(source: InventoryModel[]): any[] {
    return source.map(item => ({
      ProductId: item.ProductId,
      index: this.productIndexMap.get(item.ProductId) ?? 0,
      ProductName: item.ProductName,
      Category: item.Category,
      UnitPrice: item.UnitPrice,
      stock: this.num(item.Quantity),
    }));
  }

  loadInventory() {
    this._store.dispatch(new ShowSpinner());
    this._inventoryService.getInventoryList().pipe(
      take(1),
      tap((resp: any) => {
        if (resp.IsOk) {
           this.inventoryItems = resp.Results[0];
            this.inventoryItems.forEach((item: InventoryModel) => {
              const productGroup = this.fb.group({
                ProductId: [item.ProductId],
                ProductCode: [item.ProductCode],
                ProductName: [item.ProductName],
                Description: [item.ProductDescription],
                Supplier: [item.Supplier],
                Quantity: [1, Validators.required],
                Brand: [item.Brand],
                Category: [item.Category],
                UnitPrice: [item.UnitPrice]
              });
              this.productIndexMap.set(item.ProductId, this.products.length);
              this.stockMap.set(item.ProductId, this.num(item.Quantity));
              this.products.push(productGroup);
            });
            this.applyFilter();

           return;
         }
       }),
       finalize(() => {
         this._store.dispatch(new HideSpinner());
       })
     ).subscribe();
   }

  loadPaymentTypes(): void {
    this._paymentTypeService.getPaymentTypes().pipe(
      take(1),
      tap((resp: any) => {
        if (resp.IsOk) {
          this.paymentTypes = resp.Results[0] ?? [];
        }
      })
    ).subscribe();
  }

  selectPaymentType(paymentTypeId: number): void {
    this.details.get('PaymentTypeId')?.setValue(paymentTypeId);
  }

  get selectedPaymentTypeId(): number | null {
    return this.details.get('PaymentTypeId')?.value ?? null;
  }

  get selectedPaymentTypeLabel(): string {
    const selected = this.paymentTypes.find(
      pt => pt.PaymentTypeId === this.selectedPaymentTypeId
    );
    return selected ? selected.Label : '';
  }

  processPayment(): void {
    if (this.carts.length === 0) {
      return;
    }

    if (this.selectedPaymentTypeId == null) {
      this.details.get('PaymentTypeId')?.markAsTouched();
      return;
    }

    const payload = {
      PaymentTypeId: this.selectedPaymentTypeId,
      Total: this.details.get('Total')?.value,
      Items: this.carts.value,
    };

    // TODO: send `payload` to the checkout / transaction-save endpoint
    console.log('process payment', payload);
  }

   get getTotal(): number {
    let total = 0;
    this.carts.controls.forEach((item: any) => {
      const quantity = item.get('Quantity').value;
      const unitPrice = item.get('UnitPrice').value;
      total += quantity * unitPrice;
    });
    return total;
   }

   // Total number of units across all cart lines (for the header stat)
   get totalItems(): number {
    return this.carts.controls.reduce(
      (sum, control) => sum + (Number(control.get('Quantity')?.value) || 0),
      0
    );
   }

  getProductValue(index: number, controlName: string): string {
    const control = this.products.at(index).get(controlName);

    return control ? control.value : "";
  }

  getProductIndex(productId: number): number {
    return this.productIndexMap.get(productId) ?? 0;
  }

  getDetailsValue(controlName: string): string {
    const control = this.details.get(controlName);

    return control ? control.value : "";
  }
  
  calculateTotal(): void {
    const total = this.carts.controls.reduce((sum, control) => {
      const rowTotal = control.get('RowTotal')?.value || 0;
      return sum + rowTotal;
    }, 0);
  
    this.details.get('Total')?.setValue(total);
  }

  // Add missing methods for product quantity control
  decreaseProductQuantity(index: number): void {
    const control = this.products.at(index).get('Quantity');
    if (control && control.value > 1) {
      control.setValue(control.value - 1);
    }
  }

  increaseProductQuantity(index: number): void {
    const control = this.products.at(index).get('Quantity');
    if (!control) {
      return;
    }

    const productId = this.getProductValue(index, 'ProductId');
    const stock = this.stockMap.get(productId) ?? 0;
    const next = this.num(control.value) + 1;

    if (next > stock) {
      this.showStockError(`Only ${stock} of "${this.getProductValue(index, 'ProductName')}" in stock.`);
      return;
    }

    control.setValue(next);
  }

  // Add clear cart method
  clearCart(): void {
    while (this.carts.length !== 0) {
      this.carts.removeAt(0);
    }
    this.details.get('PaymentTypeId')?.reset(null);
    this.calculateTotal();
  }

}
