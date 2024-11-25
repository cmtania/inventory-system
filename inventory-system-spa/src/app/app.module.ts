
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppConfigService } from './core/app-config-service';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxsModule.forRoot([], { developmentMode: /** !environment.production */ false })
    ],
    providers:[
        {
        provide: APP_INITIALIZER,
        useFactory: (appConfigService: AppConfigService) => () => {
        const configFile = environment.production ? 
            `assets/config/config.json` : `assets/config/config.dev.json`;
        appConfigService.load(configFile);
        },
        deps: [AppConfigService],
        multi: true
        },
        HttpClientModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
