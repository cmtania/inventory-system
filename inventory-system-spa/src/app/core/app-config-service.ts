import { Injectable } from "@angular/core";
import { IAppConfig } from "../modules/interfaces/app-config-model.interface";
import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";



@Injectable({
    providedIn: "root"
})
export class AppConfig {
    public static settings: IAppConfig

    constructor(private readonly http: HttpClient){}

    public load(configUrl: string): Promise<void>{
        return new Promise((resolve, reject) => {
            this.http.get(configUrl)
            .toPromise()
            .then((res) => {
                AppConfig.settings = res as IAppConfig;
                
                resolve();
            })
            .catch(error => throwError(error));
        })
    }
}