import { Component, TemplateRef, ViewChild } from '@angular/core';
import { finalize, take, tap } from 'rxjs';
import { HideSpinner, ShowSpinner } from '../../../state-management/actions/spinner.action';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actions, Store } from '@ngxs/store';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SubSink } from 'subsink';
import { BrandModel } from '../../../model/brand.model';
import { CategoryModel } from '../../../model/category.model';
import { ResponseObject } from '../../../model/response.object';
import { BrandService } from '../../../services/brand.service';
import { CategoryService } from '../../../services/category.service';
import { ToastService } from '../../../shared/toast/toast.service';
import { TriggerSaveProduct } from '../../../state-management/actions/product.action';
import { FormUtils } from '../../../utils/form.utils';
import { InventoryService } from '../../../services/inventory.service';
import { TriggerSaveInventory } from '../../../state-management/actions/inventory.action';
import { InventoryModel } from '../../../model/inventory.model';
import { ProductService } from '../../../services/product.service';
import { ProductModel } from '../../../model/product.model';

@Component({
  selector: 'app-inventory-modal',
  templateUrl: './inventory-modal.component.html',
  styleUrl: './inventory-modal.component.scss',
})
export class InventoryModalComponent {
  inventoryForm: FormGroup;
  title?: string;
  closeBtnName?: string;
  saveBtnName?: string;
  formUtils = FormUtils;
  brandList = new Array<BrandModel>();
  categoryList = new Array<CategoryModel>();
  productList = new Array<ProductModel>();

  inventoryId: number = 0;
  isUpdate: boolean = false;

  subsink = new SubSink();

  // TODO: make it dynamic
  @ViewChild('toastTemplate') toastTemplate!: TemplateRef<any>;
  toastMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private readonly _brandService: BrandService,
    private readonly _categoryService: CategoryService,
    private readonly _inventoryService: InventoryService,
    private readonly _productService: ProductService,
    private readonly _toastService: ToastService,
    private readonly _action$: Actions,
    private readonly _store: Store,
    public bsModalRef: BsModalRef
  ) {
    this.inventoryForm = this.fb.group({
      ProductId: ['', [Validators.required, Validators.minLength(1)]],
      Supplier: ['', [Validators.required, Validators.minLength(2)]],
      UnitPrice: [0, [Validators.required]],
      Quantity: [0, [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.inventoryId > 0) {
      this.getInventory(this.inventoryId);
    }

    this.subsink.add(this.getProducts());
  }

  onSubmit() {
    if (this.inventoryForm.valid) {
      console.log(this.inventoryForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  saveInventory() {
    if (this.isUpdate) {
      this.saveChanges();
      return;
    }

    this.createNewInventory();
  }

  createNewInventory(): void {
    this._store.dispatch(new ShowSpinner());
    const invModel = {
      ProductId: this.inventoryForm.get('ProductId')?.value,
      Supplier: this.inventoryForm.get('Supplier')?.value,
      UnitPrice: this.inventoryForm.get('UnitPrice')?.value,
      Quantity: this.inventoryForm.get('Quantity')?.value,
    };

    this._inventoryService
      .saveInventory(invModel)
      .pipe(
        take(1),
        tap((resp: ResponseObject) => {
          if (resp && resp.IsOk) {
            console.log('saved');
            this.bsModalRef.hide();
            this._store.dispatch(new TriggerSaveInventory());

            this.toastMessage = 'Saved successfully.';
            this._toastService.show(this.toastTemplate, 'SUCCESS');

            return;
          }

          this.toastMessage = 'An error occurred while saving the product.';
          this._toastService.show(this.toastTemplate, 'ERROR');
        }),
        finalize(() => {
          this._store.dispatch(new HideSpinner());
        })
      )
      .subscribe();
  }

  private saveChanges(): void{
    this._store.dispatch(new ShowSpinner());
    const invModel = {
      InventoryId: this.inventoryId,
      ProductId: this.inventoryForm.get('ProductId')?.value,
      Supplier: this.inventoryForm.get('Supplier')?.value,
      UnitPrice: this.inventoryForm.get('UnitPrice')?.value,
      Quantity: this.inventoryForm.get('Quantity')?.value,
    };

    this._inventoryService.updateInventory(invModel).pipe(
      take(1),
      tap((resp: ResponseObject) => {
        if (resp && resp.IsOk) {
          console.log("updated");
          this.bsModalRef.hide();
          this._store.dispatch(new TriggerSaveInventory());

          this.toastMessage = "Updated successfully.";
          this._toastService.show(this.toastTemplate,"SUCCESS");

          return;
        }

        this.toastMessage = "An error occurred while updating the product.";
        this._toastService.show(this.toastTemplate,"ERROR");
      }),
      finalize(() => {
          this._store.dispatch(new HideSpinner());
      })
    ).subscribe();
  }

  private getInventory(inventoryId: number){
    this._store.dispatch(new ShowSpinner());
    this._inventoryService.getInventoryById(inventoryId).pipe(
      take(1),
      tap((resp: ResponseObject) => {
        if (resp && resp.IsOk) {
          const inventory = resp.Results[0] as InventoryModel;
          this.inventoryForm.patchValue({
            ProductId: inventory.ProductId,
            Supplier: inventory.Supplier,
            UnitPrice: inventory.UnitPrice,
            Quantity: inventory.Quantity
          });
        }
      }),
      finalize(() => {
          this._store.dispatch(new HideSpinner());
      })
    ).subscribe();
  }

  private getProducts() {
    return this._productService.getProducts().subscribe((response: any) => {
      if (response.IsOk) {
        this.productList = response.Results[0];
      }
    });
  }

  // Utility method to check if a control is invalid and touched
  isInvalid(controlName: string): boolean {
    const control = this.inventoryForm.get(controlName);

    return control ? control.invalid && control.touched : false;
  }

  ngOnDestroy() {
    console.log('modal component destroy');
    this.subsink.unsubscribe();
    this.inventoryForm.reset();
  }
}
