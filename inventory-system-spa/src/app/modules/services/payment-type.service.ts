import { Injectable } from "@angular/core";
import { AppConfig } from "../../core/app-config-service";
import { HttpCommonService } from "./http-common.service";

@Injectable({
  providedIn: 'root',
})
export class PaymentTypeService {
    constructor(private readonly _httpCommonService: HttpCommonService){}

    private readonly baseUrl = `${AppConfig.settings.webApiUrl}PaymentType`;

    getPaymentTypes() {
      const url = `${this.baseUrl}/list`;

      return this._httpCommonService.httpGet(url);
    }
}
