import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout.component";
import { LayoutRoutingModule } from "./layout-routing.module";
import { NgModule } from "@angular/core";
import { SideNavComponent } from "../side-nav/side-nav.component";
import { HeaderComponent } from "../header/header.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ReportsComponent } from "../reports/reports.component";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WebApi } from "../../services/webapi.service";
import { ProductService } from "../../services/product.service";
import { HttpClientModule } from "@angular/common/http";
import { ProductComponent } from "../product/product.component";
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ProductModalComponent } from "../modal/product-modal/product-modal.component";
import { BrandService } from "../../services/brand.service";
import { InventoryComponent } from "../inventory/inventory.component";
import { InventoryModalComponent } from "../modal/inventory-modal/inventory-modal.component";
import { TransactionComponent } from "../transaction/transaction.component";

@NgModule({
  imports: [
    FormsModule,
    LayoutRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule
  ],  
  declarations: [
    LayoutComponent,
    DashboardComponent,
    SideNavComponent,
    HeaderComponent,
    ReportsComponent,
    ProductComponent,
    InventoryComponent,
    ProductModalComponent,
    InventoryModalComponent,
    TransactionComponent
  ],
  exports:[MatButtonModule],  
  providers:[ 
    WebApi,
    ProductService,
    BrandService,
    BsModalService
  ]
})
export class LayoutModule { }
