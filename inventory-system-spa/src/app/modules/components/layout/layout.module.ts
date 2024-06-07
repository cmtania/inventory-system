import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./layout.component";
import { LayoutRoutingModule } from "./layout-routing.module";
import { NgModule } from "@angular/core";
import { SideNavComponent } from "../side-nav/side-nav.component";
import { HeaderComponent } from "../header/header.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ReportsComponent } from "../reports/reports.component";
import { MatButtonModule } from '@angular/material/button';
import { SidebarNavService } from "../../services/sidebar-nav.service";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    FormsModule,
    LayoutRoutingModule,
    CommonModule,
  ],  
  declarations: [
    LayoutComponent,
    DashboardComponent,
    SideNavComponent,
    HeaderComponent,
    ReportsComponent
  ],
  exports:[MatButtonModule],  
  providers:[ SidebarNavService
   ]

})
export class LayoutModule { }
