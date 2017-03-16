import { Injectable, Inject, Injector } from '@angular/core';
import { Headers } from '@angular/http';
import { BaseService } from './base-service';
import 'rxjs/Rx';

@Injectable()
export class UserService extends BaseService {
  constructor(@Inject(Injector) private inj: Injector) {
    super(inj);
  }

  login(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append("Authorization", "Basic " + btoa(data.email + ":" + data.password));
    let access_token = this.config.accessToken;
    let urlSearchParams = this.buildParams(['access_token'], {access_token});
    return this.http.post(`${this.config.apiEndpoint}/auth`,
      urlSearchParams,
      { headers }, {noAuth: true}
    ).map(res => res.json()).map((res) => {
      if (res.token) {
        sessionStorage.setItem('hjy_auth_token', res.token);
        sessionStorage.setItem('hjy_uid', res.user.id)
      }
      return res;
    }).catch(this.handleError);
  }

  logout() {
    return this.http.post(`${this.config.apiEndpoint}/logout`,
      '',{}
    ).map((res) => {
       sessionStorage.removeItem('hjy_auth_token');
       return this.handleRes(res);
    }).catch(this.handleError)
    .finally(() => {
      sessionStorage.removeItem('hjy_auth_token');
    });
  }

  signup(data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    data.access_token = this.config.accessToken;
    let urlSearchParams = this.buildParams(['email', 'password', 'access_token'], data);
    return this.http.post(
      `${this.config.apiEndpoint}/users`,
      urlSearchParams,
      { headers }, { noAuth: true }
    ).map((res) => {
       return this.handleRes(res);
    }).catch(this.handleError);
  }

  isLoggedIn() {
    return !!sessionStorage.getItem('hjy_auth_token');
  }

}
