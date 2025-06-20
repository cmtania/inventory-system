import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { finalize, take, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { HideSpinner, ShowSpinner } from '../../state-management/actions/spinner.action';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

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

    username = "";
    password = "";

    login(){
      this._store.dispatch(new ShowSpinner());
      console.log("login");
      console.log(this.username, this.password);

      if(!this.loginForm.valid) {
        this._store.dispatch(new HideSpinner());
        return;
      }

      const loginParam = {
        UserName: this.loginForm.get("UserName")?.value,
        Password: this.loginForm.get("Password")?.value,
      }

      this._loginService.login(loginParam.UserName, loginParam.Password).pipe(
        take(1),
        tap((resp: any) => {
          console.log('resp', resp);
          if (resp.IsOk && resp.Results[0]?.Token) {
          // Store the token in local storage or a service
            localStorage.setItem('auth_token', resp.Results[0].Token);
            this.router.navigate(["/dashboard"]);
          }
        }
      ),
        finalize(() => {
                this._store.dispatch(new HideSpinner());
            })
    ).subscribe();

      
    }
}
