import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { NgModule } from "@angular/core";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { ReportsComponent } from "../reports/reports.component";

const routes: Routes = [{
    path: "",
    component: LayoutComponent,
      children: [
          { path: "", redirectTo: "/home/dashboard", pathMatch: "full"},
          { path: "dashboard", component: DashboardComponent},
          { path: "reports", component: ReportsComponent}
      ],       
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class LayoutRoutingModule { }
