import { Injectable } from "@angular/core";
import { WebApi } from "./webapi.service";
import { catchError, concatMap, map, of } from "rxjs";
import { ResponseObject } from "../model/response.object";


@Injectable()
export class ProductService {
    constructor(private webApi: WebApi){

    }

    private readonly baseUrl = "https://localhost:44339/api/"

    getProducts() {
        const url = `${this.baseUrl}Product/getproducts`;
        return this.webApi.httpGet(url).pipe(
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

