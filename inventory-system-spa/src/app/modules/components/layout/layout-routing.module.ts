import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ReportsComponent } from "../reports/reports.component";
import { ProductComponent } from "../product/product.component";

const routes: Routes = [{
    path: "",
    component: LayoutComponent,
      children: [
          { path: "", redirectTo: "/home/dashboard", pathMatch: "full"},
          { path: "dashboard", component: DashboardComponent},
          { path: "products", component: ProductComponent },
          { path: "reports", component: ReportsComponent },
      ],       
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class LayoutRoutingModule { }
