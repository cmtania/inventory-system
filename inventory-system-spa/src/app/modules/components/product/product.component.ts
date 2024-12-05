import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { SubSink } from 'subsink';
import { ProductModel } from '../../model/product.model';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ProductModalComponent } from '../modal/product-modal/product-modal.component';
import { CONSTANTS } from '../../model/constants.model';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService, 
              private modalService: BsModalService,){
  }

  subsink = new SubSink();
  productList = new Array<ProductModel>();
  modalTitle: string = "";
  bsModalRef?: BsModalRef;

  ngOnInit(){
    this.subsink.add(
      this.getProducts()
    );
  }

  getProducts() {
    return this.productService.getProducts().subscribe(
      (response) => {
        if (response.IsOk) {
          this.productList = response.Results[0];
          return;
        } 
      },
    );
  }

  

  ngOnDestroy(){
    this.subsink.unsubscribe();
  }

  createProduct() {
    const initialState: ModalOptions = {
      initialState: {
        title: CONSTANTS.PRODUCT_CreateModalTitle,
      }
    };
    this.bsModalRef = this.modalService.show(ProductModalComponent, initialState);
    this.bsModalRef.content.closeBtnName = CONSTANTS.LABEL_ButtonClose;
    this.bsModalRef.content.saveBtnName = CONSTANTS.LABEL_ButtonSave;
  }

  editProduct(productId: number){
    console.log("product", productId);
    const initialState: ModalOptions = {
      initialState: {
        title: CONSTANTS.PRODUCT_EditModalTitle
      },
      class: "modal-md"
    };
    this.bsModalRef = this.modalService.show(ProductModalComponent, initialState);
    this.bsModalRef.content.closeBtnName = CONSTANTS.LABEL_ButtonCancel;
    this.bsModalRef.content.saveBtnName = CONSTANTS.LABEL_ButtonUpdate;
  }
}
