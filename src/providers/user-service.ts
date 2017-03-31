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
        localStorage.setItem('hjy_auth_token', res.token);
        localStorage.setItem('hjy_uid', res.user.id);
      }
      return res;
    }).catch(this.handleError);
  }

  logout() {
    return this.http.post(`${this.config.apiEndpoint}/logout`,
      '',{}
    ).map((res) => {
       localStorage.removeItem('hjy_auth_token');
       return this.handleRes(res);
    }).catch(this.handleError)
    .finally(() => {
      localStorage.removeItem('hjy_auth_token');
    });
  }

  update(id, data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = this.buildParams(['name', 'picture', 'jpushid'], data);
    return this.http.put(`${this.config.apiEndpoint}/users/${id}`,
      urlSearchParams,{headers}
    ).map((res) => {
       return this.handleRes(res);
    }).catch(this.handleError);
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
    return !!localStorage.getItem('hjy_auth_token');
  }

}
