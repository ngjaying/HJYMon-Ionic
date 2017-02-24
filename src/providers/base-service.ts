import {  Injector } from '@angular/core';
import { URLSearchParams, Response } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../app/app.config';
import { MyHTTP } from './my-http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

export class BaseService {
  protected http: MyHTTP;
  protected config: IAppConfig;

  constructor(private injector: Injector) {
    this.http = injector.get(MyHTTP);
    this.config = injector.get(APP_CONFIG);
  }

  protected handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      if(body.code){
        errMsg = `${body.code} - ${body.message || ''}`;
      }else{
        errMsg = "连接服务器失败，请检查您的网络连接";
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  protected handleRes(res){
    res = res.json();
    if (res.message) {
      return Observable.throw(res.message);
    }
    return res;
  }

  protected buildParams(params: Array<string>, data){
    let urlSearchParams = new URLSearchParams();
    params.forEach((p) =>{
      if(data[p]){
        urlSearchParams.append(p, '' + data[p]);
      }
    });
    return urlSearchParams;
  }
}
