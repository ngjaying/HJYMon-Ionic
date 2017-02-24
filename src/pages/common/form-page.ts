import { Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

export class FormPage {
  protected data: {}
  protected fb: FormBuilder;
  protected alertCtrl: AlertController;
  protected loadingCtrl: LoadingController;
  protected navCtrl: NavController;
  protected showLoading: boolean = true;
  protected static patterns = {
    'mobile': '^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$',
    'email': "^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$"
  }
  submitted = false;
  myform: FormGroup;
  formErrors = {};
  validationMessages = {};
  protected loader = null;

  constructor( private injector: Injector ) {
    this.fb = injector.get(FormBuilder);
    this.alertCtrl = injector.get(AlertController);
    this.loadingCtrl = injector.get(LoadingController);
    this.navCtrl = injector.get(NavController);
    this.buildForm();
  }

  buildForm(): void {
    console.log('build form');
    this.doBuildForm();
    this.myform.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  protected doBuildForm(): void {

  }

  onValueChanged(data?: any) {
    if (!this.myform) { return; }
    const form = this.myform;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if(this.showLoading){
      this.presentLoading();
    }
    this.data = this.myform.value;
    this.doSubmit();
  }

  protected doSubmit() {
  }

  protected successCallback(){
    this.submitted = false;
    if(this.showLoading){
      this.dismissLoading();
    }
  }

  protected errorCallback(title, error){
    this.submitted = false;
    if(this.showLoading){
      this.dismissLoading();
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

  dismissLoading() {
    if(this.loader){
      this.loader.dismiss();
      this.loader = null;
    }
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
