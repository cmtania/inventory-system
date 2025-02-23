import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { HideSpinner, ShowSpinner } from '../../state-management/actions/spinner.action';
import { Store } from '@ngxs/store';
import { take, tap, finalize } from 'rxjs';
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
  inventoryItems = [
    // Example inventory items
    { ProductId: 1, ProductCode: 'P001', ProductName: 'Product 1', Brand: 'Brand A', Category: 'Category X', UnitPrice: 100 },
    { ProductId: 2, ProductCode: 'P002', ProductName: 'Product 2', Brand: 'Brand B', Category: 'Category Y', UnitPrice: 200 }
  ];
  constructor(
    private fb: FormBuilder,
    private readonly _productService: ProductService,
    private readonly _store: Store,
    private readonly _inventoryService: InventoryService){
      this.transactionForm = this.fb.group({
              Cart: [new Array<Cart>()],
            });
  }

  productList = new Array<ProductModel>();
  currentPage: number = 1;
  // inventoryItems = new Array<InventoryModel>();

  transaction = new Transaction( new Array<Cart>());


  ngOnInit(): void {
    this.loadInventory();

    this.transactionForm = this.fb.group({
      carts: this.fb.array([])
    });

    // Example data for carts
    const exampleCarts = [
      { ItemId: 1, ProductName: 'Product 1', Quantity: 2, UnitPrice: 100, RowTotal: 200 },
      { ItemId: 2, ProductName: 'Product 2', Quantity: 1, UnitPrice: 200, RowTotal: 200 }
    ];

    this.setCarts(exampleCarts);
  }

  get carts(): FormArray {
    return this.transactionForm.get('carts') as FormArray;
  }

  setCarts(carts: any[]): void {
    const cartFGs = carts.map(cart => this.fb.group({
      ItemId: [cart.ItemId],
      ProductName: [cart.ProductName],
      Quantity: [cart.Quantity, Validators.required],
      UnitPrice: [cart.UnitPrice],
      RowTotal: [cart.RowTotal]
    }));
    const cartFormArray = this.fb.array(cartFGs);
    this.transactionForm.setControl('carts', cartFormArray);
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

           return;
         }
       }),
       finalize(() => {
         this._store.dispatch(new HideSpinner());
       })
     ).subscribe();
   }
}
