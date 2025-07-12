import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { HideSpinner, ShowSpinner } from '../../state-management/actions/spinner.action';
import { Store } from '@ngxs/store';
import { take, tap, finalize  } from 'rxjs';
import { ProductModel } from '../../model/product.model';
import { InventoryModel } from '../../model/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { Cart, Transaction } from '../../model/transaction.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  standalone: false,
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit {

  transactionForm: FormGroup;
  currentDate = new Date(); // Add current date property
  constructor(
    private fb: FormBuilder,
    private readonly _productService: ProductService,
    private readonly _store: Store,
    private readonly _inventoryService: InventoryService){
      this.transactionForm = this.fb.group({
        carts: this.fb.array([]),
        products: this.fb.array([]),
        details: this.fb.group({
          ItemCount: [0],
          Total: [0],
        })
      });
  }

  productList = new Array<ProductModel>();
  currentPage: number = 1;
  inventoryItems = new Array<InventoryModel>();

  transaction = new Transaction( new Array<Cart>());

  ngOnInit(): void {
    this.loadInventory();
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
    console.log("item", item);

    const unitPrice = this.getProductValue(index, 'UnitPrice');
    const quantity = this.getProductValue(index, 'Quantity');
    console.log("unitPrice", unitPrice);
    console.log("quantity", quantity);

    const selectedItem = this.fb.group({
      ItemId: [this.carts.length + 1],
      ProductName: [this.getProductValue(index, 'ProductName')],
      Description: [this.getProductValue(index, 'Description')],
      Quantity: [quantity, Validators.required],
      UnitPrice: [unitPrice],
      RowTotal: [(+unitPrice * +quantity)]
    });

    this.carts.push(selectedItem);

    this.calculateTotal();
  }

  deleteCartItem(index: number): void {
    this.carts.removeAt(index);
    this.calculateTotal();
  }

  quantityChange(index: number): void {
    const control = this.carts.at(index).get('Quantity');
    const unitPrice = this.carts.at(index).get('UnitPrice');
    const rowTotal = control?.value * unitPrice?.value;
    this.carts.at(index).get('RowTotal')?.setValue(rowTotal);
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
    const control = this.carts.at(index).get('Quantity');
    if (control) {
      control.setValue(control.value + 1);
      this.quantityChange(index);
    }
  }


  getProducts() {
     this._store.dispatch(new ShowSpinner());
     this._productService.getProducts().pipe(
      take(1),
      tap((resp: any) => {
        console.log("resp", resp);
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

    loadInventory() {
      this._store.dispatch(new ShowSpinner());
      this._inventoryService.getInventoryList().pipe(
       take(1),
       tap((resp: any) => {
         console.log("resp", resp);
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
              this.products.push(productGroup);
            });

           return;
         }
       }),
       finalize(() => {
         this._store.dispatch(new HideSpinner());
       })
     ).subscribe();
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

   getProductValue(index: number, controlName: string): string {
    const control = this.products.at(index).get(controlName);

    return control ? control.value : "";
  }

  getDetailsValue(controlName: string): string {
    const control = this.details.get(controlName);

    return control ? control.value : "";
  }
  
  calculateTotal(): void {
    console.log("calculateTotal");
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
    if (control) {
      control.setValue(control.value + 1);
    }
  }

  // Add clear cart method
  clearCart(): void {
    while (this.carts.length !== 0) {
      this.carts.removeAt(0);
    }
    this.calculateTotal();
  }

}
