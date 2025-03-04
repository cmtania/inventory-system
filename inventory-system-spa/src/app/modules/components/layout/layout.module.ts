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
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ProductComponent } from "../product/product.component";
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ProductModalComponent } from "../modal/product-modal/product-modal.component";

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
    ProductModalComponent
  ],
  exports:[MatButtonModule],  
  providers:[ 
    WebApi,
    ProductService,
    BsModalService
  ]
})
export class LayoutModule { }
