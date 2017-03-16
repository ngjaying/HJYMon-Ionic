import { Component, Injector, Inject } from '@angular/core';

import { ModalController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { LaunchyService } from '../../providers/launchy-service';
import { LoginPage } from '../login/login';
import { InfoPage } from '../common/info-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends InfoPage {

  constructor(@Inject(Injector) private inj: Injector, public modalCtrl: ModalController, public userService: UserService, public launchyService: LaunchyService) {
    super(inj);
  }

  ngOnInit(){
    if(!this.userService.isLoggedIn()){
      let modal = this.modalCtrl.create(LoginPage);
      modal.onDidDismiss(() => {
        if(this.userService.isLoggedIn){
          this.doRefresh();
        }
      });
      modal.present();
    }else{
      this.doRefresh();
    }
  }

  ionViewDidLoad(){
  }

  doSubmit(refresher?) {
    this.launchyService.get().subscribe((res) => {
      this.successCallback(res, refresher);
    }, (error) => {
      this.errorCallback('获取关注列表失败', error, refresher);
    });
  }

  loadPage(start, infiniteScroll?){
    this.launchyService.get().subscribe((res) => {
      this.successCallback(res, null, infiniteScroll);
    }, (error) => {
      this.errorCallback('获取关注列表失败', error, null, infiniteScroll);
    });
  }

}
