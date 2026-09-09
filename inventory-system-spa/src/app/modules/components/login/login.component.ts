import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { finalize, take, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { HideSpinner, ShowSpinner } from '../../state-management/actions/spinner.action';
import { LoginModel } from '../../model/login.model';
import { AlertModule } from 'ngx-bootstrap/alert';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AlertModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  isLoginFailed = false;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private readonly _loginService: LoginService,
      private readonly _store: Store) {
     this.loginForm = this.fb.group({
            UserName: ['', [Validators.required]],
            Password: ['', [Validators.required]],
          });
   }


    login(){
      this._store.dispatch(new ShowSpinner());

      if(!this.loginForm.valid) {
        this._store.dispatch(new HideSpinner());
        return;
      }

      const loginParam = new LoginModel(
        this.loginForm.get("UserName")?.value,
        this.loginForm.get("Password")?.value
      );

      this._loginService.login(loginParam).pipe(
        take(1),
        tap((resp: any) => {
          console.log('resp', resp);
          if (resp.IsOk && resp.Results[0]?.Token) {
            localStorage.setItem('auth_token', resp.Results[0].Token);
            localStorage.setItem('full_name', resp.Results[0].FullName);
            localStorage.setItem('role', resp.Results[0].Role);
            this.router.navigate(["/dashboard"]);

            return;
          }

          this.isLoginFailed = true;
        }
      ),
        finalize(() => {
                this._store.dispatch(new HideSpinner());
            })
    ).subscribe();

      
    }
}
