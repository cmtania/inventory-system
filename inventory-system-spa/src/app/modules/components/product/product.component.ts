import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
  filteredProducts = new Array<ProductModel>();
  paginatedProducts = new Array<ProductModel>();
  modalTitle: string = "";
  bsModalRef?: BsModalRef;

  toastMessage: string = "";
  searchTerm: string = "";
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  totalPagesArray: number[] = [];

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
      if (resp.IsOk) {
        this.productList = resp.Results[0];
        this.filterProducts();
        return;
      }

      this.toastMessage = "An error occurred while loading the products.";
      this._toastService.show(this.toastTemplate,"ERROR");

    }),
    finalize(() => {
      this._store.dispatch(new HideSpinner());
    })
  ).subscribe();

  }

  filterProducts() {
    this.filteredProducts = this.productList.filter(product =>
      product.ProductName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.ProductCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.ProductDescription.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.Brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.Category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.changePage(1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
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