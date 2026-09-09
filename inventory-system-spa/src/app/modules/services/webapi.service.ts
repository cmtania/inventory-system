import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
  })

export class WebApi {

    constructor(private readonly _httpClient: HttpClient){}

     customHeaders = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorize-Application": "InventorySystem"
      });

    httpPost(url: string, body: any):Observable<any> {
        return this._httpClient.post(url, body, { headers: this.customHeaders });
    }

    httpGet(url: string, body: any = null):Observable<any> {
        return this._httpClient.get(url, {headers: this.customHeaders});
    }

    httpDelete(url: string, body: any = null):Observable<any> {
      return this._httpClient.delete(url, {headers: this.customHeaders});
  }
}