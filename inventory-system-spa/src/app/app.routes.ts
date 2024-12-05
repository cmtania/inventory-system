import { Routes } from "@angular/router";
import { LoginComponent } from "./modules/components/login/login.component";

export const routes: Routes = [
    {path: "", pathMatch: "full",  redirectTo: "login"},
    {path: "login", component: LoginComponent},
    { 
        path: "home", 
        loadChildren: () => 
          import("./modules/layout/layout.module").then(m => m.LayoutModule)
      }, 
];
