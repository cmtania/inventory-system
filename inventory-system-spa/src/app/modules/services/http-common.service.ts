import { Injectable } from '@angular/core';
import { WebApi } from './webapi.service';
import { catchError, concatMap, map, of } from 'rxjs';
import { ResponseObject } from '../model/response.object';
import { AppConfig } from '../../core/app-config-service';

@Injectable({
  providedIn: 'root',
})
export class HttpCommonService {
  constructor(private readonly _webApi: WebApi) {}

  public httpPost(url: string, data: any) {
    return this._webApi.httpPost(url, data).pipe(
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

  public httpGet(url: string) {
    return this._webApi.httpGet(url).pipe(
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

  public httpDelete(url: string) {
    return this._webApi.httpDelete(url).pipe(
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
