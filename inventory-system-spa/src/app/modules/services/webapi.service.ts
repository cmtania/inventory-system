import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class WebApi {

    constructor(private httpClient: HttpClient){}

     customHeaders = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorize-Application": "InventorySystem"
      });

    httpPost(url: string, body: any):Observable<any> {
        return this.httpClient.post(url, body);
    }

    httpGet(url: string, body: any = null):Observable<any> {
        console.log("HTTP GET", body);
        return this.httpClient.get(url, {headers: this.customHeaders});
    }
}