import { Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormUtils } from '../../../utils/form.utils';
import { ProductService } from '../../../services/product.service';
import { ProductModel } from '../../../model/product.model';
import { BrandService } from '../../../services/brand.service';
import { BrandModel } from '../../../model/brand.model';
import { SubSink } from 'subsink';
import { CategoryService } from '../../../services/category.service';
import { CategoryModel } from '../../../model/category.model';
import { ResponseObject } from '../../../model/response.object';
import { finalize, take, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { TriggerSaveProduct } from '../../../state-management/actions/product.action';
import { HideSpinner, ShowSpinner } from '../../../state-management/actions/spinner.action';
import { ToastService } from '../../../shared/toast/toast.service';

@Component({
  selector: 'app-product-modal',
  standalone: false,
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  title?: string;
  closeBtnName?: string;
  saveBtnName?: string;
  formUtils = FormUtils;
  brandList = new Array<BrandModel>();
  categoryList = new Array<CategoryModel>();

  productId: number = 0;
  isUpdate: boolean = false;

  subsink = new SubSink();

  // TODO: make it dynamic
  @ViewChild('toastTemplate') toastTemplate!: TemplateRef<any>;
  toastMessage: string = "";
  
  constructor(private fb: FormBuilder,
              private readonly _brandService: BrandService,
              private readonly _categoryService: CategoryService,
              private readonly  _productService: ProductService,
              private readonly _toastService: ToastService,
              private readonly _store: Store,
              public bsModalRef: BsModalRef){
      this.productForm = this.fb.group({
        ProductName: ['', [Validators.required, Validators.minLength(5)]],
        ProductCode: ['', [Validators.required, Validators.minLength(5)]],
        UnitPrice: [0, [Validators.required]],
        ProductDescription: ['',[Validators.required]],
        ProductCategory: ['', [Validators.required]],
        ProductBrand: ['', [Validators.required]]
      });
  }
  
  ngOnInit(){
    if(this.productId > 0){
      this.getProductById(this.productId);
    }

    this.subsink.add(
      this.getBrands(),
      this.getCategories()
    );
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  // Utility method to check if a control is invalid and touched
  isInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName);

    return control ? control.invalid && control.touched : false;
  }

  saveProduct(){
    if(this.isUpdate){
      this.updateProduct();

      return;
    }

    this.createProduct();
  }

  private createProduct(): void {
    this._store.dispatch(new ShowSpinner());
    const productModel = {
      ProductCode: this.productForm.get("ProductCode")?.value,
      ProductName: this.productForm.get("ProductName")?.value,
      UnitPrice: this.productForm.get("UnitPrice")?.value,
      ProductDescription: this.productForm.get("ProductDescription")?.value,
      BrandId: parseInt(this.productForm.get("ProductBrand")?.value),
      CategoryId: parseInt(this.productForm.get("ProductCategory")?.value),
    }

    this._productService.saveProduct(productModel).pipe(
      take(1),
      tap((resp: ResponseObject) => {
        if (resp && resp.IsOk) {
          console.log("saved");
          this.bsModalRef.hide();
          this._store.dispatch(new TriggerSaveProduct());

          this.toastMessage = "Saved successfully.";
          this._toastService.show(this.toastTemplate,"SUCCESS");

          return;
        }

        this.toastMessage = "An error occurred while saving the product.";
        this._toastService.show(this.toastTemplate,"ERROR");
      }),
      finalize(() => {
          this._store.dispatch(new HideSpinner());
      })
    ).subscribe();

  }

  private updateProduct(): void{
    this._store.dispatch(new ShowSpinner());
    const productModel = {
      ProductId: this.productId,
      ProductCode: this.productForm.get("ProductCode")?.value,
      ProductName: this.productForm.get("ProductName")?.value,
      UnitPrice: this.productForm.get("UnitPrice")?.value,
      ProductDescription: this.productForm.get("ProductDescription")?.value,
      BrandId: parseInt(this.productForm.get("ProductBrand")?.value),
      CategoryId: parseInt(this.productForm.get("ProductCategory")?.value),
    }

    this._productService.updateProduct(productModel).pipe(
      take(1),
      tap((resp: ResponseObject) => {
        if (resp && resp.IsOk) {
          console.log("updated");
          this.bsModalRef.hide();
          this._store.dispatch(new TriggerSaveProduct());
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

  private getProductById(productId: number){
    this._store.dispatch(new ShowSpinner());
    this._productService.getProductById(productId).pipe(
      take(1),
      tap((resp: ResponseObject) => {
        if (resp && resp.IsOk) {
          const product = resp.Results[0] as ProductModel;
          this.productForm.patchValue({
            ProductName: product.ProductName,
            ProductCode: product.ProductCode,
            UnitPrice: product.UnitPrice,
            ProductDescription: product.ProductDescription,
            ProductCategory: product.CategoryId,
            ProductBrand: product.BrandId
          });
        }
      }),
      finalize(() => {
          this._store.dispatch(new HideSpinner());
      })
    ).subscribe();
  }

  private getBrands() {
    return this._brandService.getBrands().subscribe(
      (response) => {
        if (response.IsOk) {
          this.brandList = response.Results[0];
        } 
      },
    );
  }

  private getCategories() {
    return this._categoryService.getCategories().subscribe(
      (response) => {
        if (response.IsOk) {
          this.categoryList = response.Results[0];
        } 
      },
    );
  }

  ngOnDestroy(){
    console.log("modal component destroy");
    this.subsink.unsubscribe();
    this.productForm.reset();
  }

}
