import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormUtils } from '../../../utils/form.utils';
import { ProductService } from '../../../services/product.service';
import { ProductModel } from '../../../model/product.model';

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
  
  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef){
    this.productForm = this.fb.group({
      ProductName: ['', [Validators.required, Validators.minLength(5)]],
      ProductCode: ['', [Validators.required, Validators.minLength(5)]],
      UnitPrice: [0, [Validators.required]],
      ProductDescription: [''],
      ProductCategory: [''],
      ProductBrand: ['']
    });
  }
  
  ngOnInit(){
    console.log("product modal");
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
    // const productModel = new ProductModel(
    //   this.productForm.get("ProductCode")?.value,
    //   this.productForm.get("ProductName")?.value,
    //   this.productForm.get("ProductDescription")?.value,
    //   this.productForm.get("ProductBrand")?.value,
    //   this.productForm.get("ProductCategory")?.value,
    //   this.productForm.get("ProductName")?.value,
    //   this.productForm.get("ProductName")?.value,
    // )
    // this._productService.saveProduct()

  }
  closeModal(){
    const productModal = new (window as any).bootstrap.Modal("#productmodal");
    console.log("modal", productModal);
    productModal.hide();
  }

  ngOnDestroy(){
    console.log("modal component destroy");
    this.productForm.reset();
  }

}
