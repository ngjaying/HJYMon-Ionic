import { Injectable, Inject, Injector } from '@angular/core';
import { Headers } from '@angular/http';
import { BaseService } from './base-service';
import 'rxjs/Rx';

@Injectable()
export class UserService extends BaseService {
  private loggedIn = false;

  constructor(@Inject(Injector) private inj: Injector) {
    super(inj);
    //localStorage.removeItem('hjy_auth_token');
    this.loggedIn = !!localStorage.getItem('hjy_auth_token');
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
        localStorage.setItem('hjy_auth_token', res.token);
        localStorage.setItem('hjy_uid', res.user.id)
        this.loggedIn = true;
      }
      return res;
    }).catch(this.handleError);
  }

  logout() {
    this.loggedIn = false;
    return this.http.post(`${this.config.apiEndpoint}/logout`,
      '',{}
    ).map((res) => {
       return this.handleRes(res);
    }).catch(this.handleError)
    .finally(() => {
      localStorage.removeItem('hjy_auth_token');
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
    return this.loggedIn;
  }

}
