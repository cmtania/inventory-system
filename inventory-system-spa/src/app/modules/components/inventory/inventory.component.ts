import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastService } from '../../shared/toast/toast.service';
import { InventoryModel } from '../../model/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { Store } from '@ngxs/store';
import { HideSpinner, ShowSpinner } from '../../state-management/actions/spinner.action';
import { take } from 'rxjs/internal/operators/take';
import { finalize, tap } from 'rxjs';
import { SubSink } from 'subsink';

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
  itemIdToDelete: number = 0;
  bsModalRef?: BsModalRef;

  subsink = new SubSink();

  constructor(
    private readonly _inventoryService: InventoryService,
    private readonly _store: Store,
    private readonly _toastService: ToastService,
    private modalService: BsModalService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.subsink.add(
      this.loadInventory()
    );
  }

   loadInventory() {
     this._store.dispatch(new ShowSpinner());
     return this._inventoryService.getInventory().pipe(
      take(1),
      tap((resp: any) => {
        console.log("resp", resp);
        if (resp.IsOk) {
          this.inventoryItems = resp.Results[0];
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

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedInventoryItems = this.filteredInventoryItems.slice(startIndex, endIndex);
  }

  ngOnDestroy() {
    this.subsink.unsubscribe();
  }
}