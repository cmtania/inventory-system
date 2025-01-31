import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { take, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { TriggerSaveProduct } from '../../../state-management/actions/product.action';
import { HideSpinner, ShowSpinner } from '../../../state-management/actions/spinner.action';

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

  subsink = new SubSink();
  
  constructor(private fb: FormBuilder,
              private readonly _brandService: BrandService,
              private readonly _categoryService: CategoryService,
              private readonly  _productService: ProductService,
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
          this._store.dispatch(new TriggerSaveProduct());
          this.closeModal();

          return;
        }

        this._store.dispatch(new HideSpinner());
      })
    ).subscribe();

  }

  closeModal(){
    const productModal = new (window as any).bootstrap.Modal("#productmodal");
    productModal.hide();
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
