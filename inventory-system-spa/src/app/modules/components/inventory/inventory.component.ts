import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastService } from '../../shared/toast/toast.service';
import { InventoryModel } from '../../model/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { HideSpinner, ShowSpinner } from '../../state-management/actions/spinner.action';
import { take } from 'rxjs/internal/operators/take';
import { finalize, tap } from 'rxjs';
import { SubSink } from 'subsink';
import { ProductModalComponent } from '../modal/product-modal/product-modal.component';
import { InventoryModalComponent } from '../modal/inventory-modal/inventory-modal.component';
import { COMMON, INVENTORY, PRODUCT } from '../../model/constants.model';
import { TriggerSaveInventory } from '../../state-management/actions/inventory.action';
import { ResponseObject } from '../../model/response.object';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  @ViewChild('toastTemplate') toastTemplate!: TemplateRef<any>;
  @ViewChild('deleteConfirmation') deleteConfirmation!: TemplateRef<any>;

  inventoryItems: InventoryModel[] = [];
  filteredInventoryItems = new Array<InventoryModel>();
  paginatedInventoryItems: InventoryModel[] = [];

  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  toastMessage: string = '';
  selecteItem!: InventoryModel;
  bsModalRef?: BsModalRef;

  subsink = new SubSink();

  constructor(
    private readonly _inventoryService: InventoryService,
    private readonly _action$: Actions,
    private readonly _store: Store,
    private readonly _toastService: ToastService,
    private _modalService: BsModalService,
  ) {}

  ngOnInit(): void {
    this.loadInventory();

    this.subsink.add(
      this.listenToSaveInventory());
  }


  listenToSaveInventory(){
      return this._action$.pipe(ofActionSuccessful(TriggerSaveInventory))
        .subscribe(()=> {
          this.loadInventory();
        });
    }

   loadInventory() {
     this._store.dispatch(new ShowSpinner());
     this._inventoryService.getInventoryList().pipe(
      take(1),
      tap((resp: any) => {
        console.log("resp", resp);
        if (resp.IsOk) {
          this.inventoryItems = resp.Results[0];
          this.filter();
          return;
        }
  
        this.toastMessage = "An error occurred while loading the inventory.";
        this._toastService.show(this.toastTemplate,"ERROR");
  
      }),
      finalize(() => {
        this._store.dispatch(new HideSpinner());
      })
    ).subscribe();
  }

  filter() {
    this.filteredInventoryItems = this.inventoryItems.filter(inv =>
      inv.ProductName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      inv.Supplier.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalPages = Math.ceil(this.filteredInventoryItems.length / this.pageSize);
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
    this.paginatedInventoryItems = this.filteredInventoryItems.slice(startIndex, endIndex);
  }

  addNewItem() {
      const initialState: ModalOptions = {
        initialState: {
          title: INVENTORY.CreateModalTitle,
          productId: 0,
          isUpdate: false
        },
        backdrop: 'static',
        keyboard: false
      };
      this.bsModalRef = this._modalService.show(InventoryModalComponent, initialState);
      this.bsModalRef.content.closeBtnName = COMMON.LABEL_ButtonClose;
      this.bsModalRef.content.saveBtnName = COMMON.LABEL_ButtonSave;
  }

  editItem(inventoryId: number){
    console.log("inventoryId", inventoryId);
    const initialState: ModalOptions = {
      initialState: {
        title: INVENTORY.EditModalTitle,
        inventoryId: inventoryId,
        isUpdate: true
      },
      class: "modal-lg",
      backdrop: 'static',
      keyboard: false
    };
    this.bsModalRef = this._modalService.show(InventoryModalComponent, initialState);
    this.bsModalRef.content.closeBtnName = COMMON.LABEL_ButtonCancel;
    this.bsModalRef.content.saveBtnName = COMMON.LABEL_ButtonUpdate;
  }

  confirmDelete(inventory: InventoryModel) {
    this.selecteItem = inventory;
    const initialState: ModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.bsModalRef = this._modalService.show(this.deleteConfirmation, initialState);
  }

  deleteItem() {
    this._store.dispatch(new ShowSpinner());
      this._inventoryService.deleteInventory(this.selecteItem.InventoryId)
      .pipe(take(1),
            tap((resp: ResponseObject) => {
              if (resp && resp.IsOk) {
                this.bsModalRef?.hide();
                this._store.dispatch(new TriggerSaveInventory());
                return;
              }
  
              this.toastMessage = "An error occurred while deleting the product.";
              this._toastService.show(this.toastTemplate,"ERROR");
            }),
            finalize(() => {
                this._store.dispatch(new HideSpinner());
            })
          ).subscribe();
    }

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }
}