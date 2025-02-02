import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { SubSink } from 'subsink';
import { ProductModel } from '../../model/product.model';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ProductModalComponent } from '../modal/product-modal/product-modal.component';
import { CONSTANTS } from '../../model/constants.model';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { TriggerSaveProduct } from '../../state-management/actions/product.action';
import { finalize, take, tap } from 'rxjs';
import { HideSpinner, ShowSpinner } from '../../state-management/actions/spinner.action';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {

  @ViewChild('toastTemplate') toastTemplate!: TemplateRef<any>;

  constructor(private readonly _productService: ProductService,
              private readonly _action$: Actions,
              private readonly _store: Store,
              private readonly _toastService: ToastService,
              private _modalService: BsModalService,){
  }

  subsink = new SubSink();
  productList = new Array<ProductModel>();
  modalTitle: string = "";
  bsModalRef?: BsModalRef;

  toastMessage: string = "";

  ngOnInit(){
    this.subsink.add(
      this.getProducts(),
      this.listenToSaveProduct()
    );
  }

  listenToSaveProduct(){
    return this._action$.pipe(ofActionSuccessful(TriggerSaveProduct))
      .subscribe(()=> {
        this.getProducts();
      });
  }

  getProducts() {
   this._store.dispatch(new ShowSpinner());
   return this._productService.getProducts().pipe(
    take(1),
    tap((resp: any) => {
      console.log("resp", resp);
      if (!resp.IsOk) {
        this.toastMessage = "An error occurred while loading the products.";
        this._toastService.show(this.toastTemplate,"ERROR");

       return;
      }
      this.toastMessage = "The products have been loaded successfully.";
      this._toastService.show(this.toastTemplate,"ERROR");
      this.productList = resp.Results[0];
    }),
    finalize(() => {
      this._store.dispatch(new HideSpinner());
    })
  ).subscribe();

  }

  createProduct() {
    const initialState: ModalOptions = {
      initialState: {
        title: CONSTANTS.PRODUCT_CreateModalTitle,
      },
      backdrop: 'static',
      keyboard: false
    };
    this.bsModalRef = this._modalService.show(ProductModalComponent, initialState);
    this.bsModalRef.content.closeBtnName = CONSTANTS.LABEL_ButtonClose;
    this.bsModalRef.content.saveBtnName = CONSTANTS.LABEL_ButtonSave;
  }

  editProduct(productId: number){
    console.log("product", productId);
    const initialState: ModalOptions = {
      initialState: {
        title: CONSTANTS.PRODUCT_EditModalTitle
      },
      class: "modal-lg",
      backdrop: 'static',
      keyboard: false
    };
    this.bsModalRef = this._modalService.show(ProductModalComponent, initialState);
    this.bsModalRef.content.closeBtnName = CONSTANTS.LABEL_ButtonCancel;
    this.bsModalRef.content.saveBtnName = CONSTANTS.LABEL_ButtonUpdate;
  }

  ngOnDestroy(){
    this.subsink.unsubscribe();
  }
}
