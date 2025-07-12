import { Injectable } from "@angular/core";
import { WebApi } from "./webapi.service";
import { catchError, concatMap, of } from "rxjs";
import { AppConfig } from "../../core/app-config-service";
import { ResponseObject } from "../model/response.object";
import { LoginModel } from "../model/login.model";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly _webApi: WebApi) {}

  private readonly baseUrl = `${AppConfig.settings.webApiUrl}`;

  login(creds: LoginModel) {
    return this._webApi.httpPost(`${this.baseUrl}login`, creds).pipe(
      concatMap((respObj: any) => {
        console.log('respObj', respObj);
        if (!respObj.IsOk) {
          throw new ResponseObject(false, [], ['error']);
        }

        return of(new ResponseObject(true, respObj.Results, []));
      }),
      catchError((respError: any) => {
        if (respError instanceof ResponseObject) {
          return of(new ResponseObject(false, [], ['Error']));
        }

        return of(new ResponseObject(false, [], ['Error']));
      })
    );
  }
}