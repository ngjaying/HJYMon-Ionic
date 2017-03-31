import { Component, Injector, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { FormPage } from '../common/form-page';
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage extends FormPage {

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required': '邮箱不能为空',
      'pattern': '邮箱格式不正确'
    },
    'password': {
      'required': '密码不能为空'
    }
  };

  constructor(@Inject(Injector) private inj: Injector, public viewCtrl: ViewController, public userService: UserService) {
    super(inj);
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  doBuildForm(): void {
    this.myform = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.pattern(FormPage.patterns.email)
      ]],
      'password': ['', Validators.required]
    });
  }

  doSubmit() {
    this.userService.login(this.data).subscribe((res) => {
      let jpushid = sessionStorage.getItem('hjymon.jpushid');
      if(jpushid){
        if(!res.user.jpushid || res.user.jpushid != jpushid){
          console.log('update jpush id');
          this.userService.update(res.user.id, {jpushid: jpushid}).subscribe(res => console.log(res));
        }
      }
      this.successCallback();
      this.viewCtrl.dismiss();
    }, (error) => {
      this.errorCallback('登录失败', error);
    });
  }

  onSignup() {
    //this.navCtrl.push(SignupPage);
  }
}
