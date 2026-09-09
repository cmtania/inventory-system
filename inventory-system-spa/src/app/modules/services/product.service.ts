import { Injectable } from "@angular/core";
import { WebApi } from "./webapi.service";
import { catchError, concatMap, map, of } from "rxjs";
import { ResponseObject } from "../model/response.object";
import { AppConfig } from "../../core/app-config-service";
import { HttpCommonService } from "./http-common.service";



@Injectable({
  providedIn: 'root',
})

export class ProductService {
    constructor(private readonly _httpCommonService: HttpCommonService){}

    private readonly baseUrl = `${AppConfig.settings.webApiUrl}Product`;

    getProducts() {
      const url = `${this.baseUrl}/list`;

      return this._httpCommonService.httpGet(url);
    }

    getProductById(productId: number) {
      const url = `${this.baseUrl}/${productId}`;
      
      return this._httpCommonService.httpGet(url);
    }

    saveProduct(product: any) {
      const url = `${this.baseUrl}/save`;
      return this._httpCommonService.httpPost(url, product);
    }

    updateProduct(product: any) {
      const url = `${this.baseUrl}/update`;

      return this._httpCommonService.httpPost(url, product);
    }

    deleteProduct(productId: number) {
      const url = `${this.baseUrl}/delete/${productId}`;

      return this._httpCommonService.httpDelete(url);
        
    }
}

