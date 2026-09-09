
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/components/login/login.component';

export const routes: Routes = [
    {path: "", pathMatch: "full",  redirectTo: "login"},
    {path: "login", component: LoginComponent},
    { 
        path: "", 
        loadChildren: () => 
          import("./modules/components/layout/layout.module").then(m => m.LayoutModule)
      }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
