import { AlertController, LoadingController } from 'ionic-angular';
import { Injector } from '@angular/core';

export abstract class InfoPage {
  protected alertCtrl: AlertController;
  protected loadingCtrl: LoadingController;
  protected loader = null;
  protected refresher = null;
  itemCount: number = 0;
  allLoaded: boolean = false;
  items = [];

  constructor( private injector: Injector ) {
    this.alertCtrl = injector.get(AlertController);
    this.loadingCtrl = injector.get(LoadingController);
  }

  public doRefresh(refresher?) {
    if(!refresher){
      this.presentLoading();
    }
    this.allLoaded = false;
    this.doSubmit(refresher);
  }

  public doInfinite(infiniteScroll?) {
    if(!this.allLoaded){
      this.loadPage(this.itemCount, infiniteScroll);
    }
  }

  protected loadPage(start, infiniteScroll?){}

  protected doSubmit(refresher?){}

  protected successCallback(res, refresher?, infiniteScroll?){
    if(infiniteScroll){
      this.items = this.items.concat(res);
      infiniteScroll.complete();
    }else{
      this.items = res;
      this.dismissLoading(refresher);
    }

    this.itemCount = this.items.length;
    if((res['total']>0 && this.itemCount >= res['total']) || res['total'] == null){
      this.allLoaded = true;
    }
  }

  protected errorCallback(title, error, refresher?, infiniteScroll?){
    if(infiniteScroll){
      infiniteScroll.complete();
    }else{
      this.dismissLoading(refresher);
    }
    this.showError(title, error);
  }

  presentLoading() {
    if (!this.loader) {
      this.loader = this.loadingCtrl.create({
        content: "载入中，请稍等...",
        duration: 5500
      });
    }
    this.loader.present();
  }

  dismissLoading(refresher?) {
    if(this.loader){
      this.loader.dismiss();
    }
    refresher && refresher.complete();
  }

  showError(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
