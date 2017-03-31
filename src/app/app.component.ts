import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';

declare var window: any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.rootPage = HomePage;
      try {
          console.log(window.plugins.jPushPlugin != null);
          window.plugins.jPushPlugin.init();
          const getRegistrationID = data => {
            try {
                console.log("window.plugins.jPushPlugin:registrationID is " + data);
                if (data.length == 0) {
                    window.setTimeout(getRegistrationID, 1000);
                }else{
                  console.log(data);
                  sessionStorage.setItem('hjymon.jpushid', data);
                }
            } catch (exception) {
                console.log(exception);
            }
          }
          window.setTimeout(()=>window.plugins.jPushPlugin.getRegistrationID(getRegistrationID), 1000);
      } catch (exception) {
          console.log(exception);
      }
    });
  }
}
