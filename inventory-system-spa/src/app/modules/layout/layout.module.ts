import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout.component";
import { LayoutRoutingModule } from "./layout-routing.module";
import { NgModule } from "@angular/core";
import { SideNavComponent } from "../components/side-nav/side-nav.component";
import { HeaderComponent } from "../components/header/header.component";
import { DashboardComponent } from "../components/dashboard/dashboard.component";
import { ReportsComponent } from "../components/reports/reports.component";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WebApi } from "../services/webapi.service";
import { ProductService } from "../services/product.service";
import { HttpClientModule } from "@angular/common/http";
import { ProductComponent } from "../components/product/product.component";
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ProductModalComponent } from "../components/modal/product-modal/product-modal.component";
import { BrandComponent } from "../components/brand/brand.component";

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
    ProductModalComponent,
    BrandComponent
  ],
  exports:[MatButtonModule],  
  providers:[ 
    WebApi,
    ProductService,
    BsModalService
  ]
})
export class LayoutModule { }
