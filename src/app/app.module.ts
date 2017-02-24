import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

//providers
import { ImageManager } from '../providers/image-manager';
import { UserService } from '../providers/user-service';
import { LaunchyService } from '../providers/launchy-service';
import { ResponseCache } from '../providers/response-cache';
import { MyHTTP } from '../providers/my-http';
import { QiniuUpload } from '../providers/qiniu-upload';

import { APP_CONFIG, AppConfig } from './app.config';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [ ResponseCache, MyHTTP, UserService, LaunchyService,
     {provide: ErrorHandler, useClass: IonicErrorHandler}, { provide: APP_CONFIG, useValue: AppConfig }
  ]
})
export class AppModule {}
