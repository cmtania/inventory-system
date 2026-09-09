
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppConfig } from './core/app-config-service';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './modules/shared/spinner/spinner.component';
import { SpinnerState } from './modules/state-management/states/spinner.state';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsContainerComponent } from './modules/shared/toast/toast-container.component';


@NgModule({
    declarations: [
        AppComponent,
        SpinnerComponent,
        ToastsContainerComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbToastModule,
        NgTemplateOutlet,
        NgxsModule.forRoot([SpinnerState], { developmentMode: /** !environment.production */ false })
    ],
    exports: [],
    providers:[
        {
        provide: APP_INITIALIZER,
        useFactory: (appConfigService: AppConfig) => () => {
        const configFile = environment.production ? 
            `assets/config/config.json` : `assets/config/config.dev.json`;

            return appConfigService.load(configFile).then(()=>{
                console.log("app config initialized.");
            });
        },
        deps: [AppConfig],
        multi: true
        },
        HttpClientModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
