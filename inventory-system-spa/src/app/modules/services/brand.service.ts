import { Injectable } from "@angular/core";
import { WebApi } from "./webapi.service";
import { catchError, concatMap, map, of } from "rxjs";
import { ResponseObject } from "../model/response.object";
import { ProductModel } from "../model/product.model";
import { AppConfig } from "../../core/app-config-service";


@Injectable()
export class BrandService {
    constructor(private webApi: WebApi){

    }

    private readonly baseUrl = AppConfig.settings.webApiUrl;

    getBrands() {
        return this.webApi.httpGet(`${this.baseUrl}Brand/getbrands`).pipe(
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

