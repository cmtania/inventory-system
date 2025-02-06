import { Injectable } from "@angular/core";
import { WebApi } from "./webapi.service";
import { catchError, concatMap, map, of } from "rxjs";
import { ResponseObject } from "../model/response.object";
import { AppConfig } from "../../core/app-config-service";



@Injectable({
  providedIn: 'root',
})

export class ProductService {
    constructor(private webApi: WebApi){}

    private readonly baseUrl = `${AppConfig.settings.webApiUrl}Product`;

    getProducts() {
      const url = `${this.baseUrl}/getproducts`;

      return this.httpGet(url);
    }

    getProductById(productId: number) {
      const url = `${this.baseUrl}/getproduct/${productId}`;
      
      return this.httpGet(url);
    }

    saveProduct(product: any) {
      const url = `${this.baseUrl}/saveproduct`;
      return this.httpPost(url, product);
    }

    updateProduct(product: any) {
      const url = `${this.baseUrl}/updateproduct`;

      return this.httpPost(url, product);
    }

    deleteProduct(productId: number) {
      const url = `${this.baseUrl}/deleteproduct/${productId}`;

      return this.webApi.httpDelete(url).pipe(
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

    private httpPost(url: string, data: any) {
      return this.webApi.httpPost(url, data).pipe(
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

    private httpGet(url: string) {
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

