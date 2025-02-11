import { Injectable } from "@angular/core";
import { WebApi } from "./webapi.service";
import { catchError, concatMap, map, of } from "rxjs";
import { ResponseObject } from "../model/response.object";
import { AppConfig } from "../../core/app-config-service";
import { HttpCommonService } from "./http-common.service";



@Injectable({
  providedIn: 'root',
})

export class InventoryService {
    constructor(private _httpCommonService: HttpCommonService){}

    private readonly baseUrl = `${AppConfig.settings.webApiUrl}Inventory`;

    getInventory() {
      const url = `${this.baseUrl}/getinventory`;

      return this._httpCommonService.httpGet(url);
    }

    getInventoryById(invId: number) {
      const url = `${this.baseUrl}/getinventory/${invId}`;
      
      return this._httpCommonService.httpGet(url);
    }

    saveInventory(inventory: any) {
      const url = `${this.baseUrl}/save`;

      return this._httpCommonService.httpPost(url, inventory);
    }

    updateInventory(inventory: any) {
      const url = `${this.baseUrl}/update`;

      return this._httpCommonService.httpPost(url, inventory);
    }

    deleteInventory(inventoryId: number) {
      const url = `${this.baseUrl}/delete/${inventoryId}`;

      return this._httpCommonService.httpDelete(url);
    }
}

