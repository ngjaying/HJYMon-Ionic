import { Injectable, Inject } from '@angular/core';
import { Http, Request, RequestMethod, URLSearchParams } from '@angular/http';
import { ResponseCache } from './response-cache';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, IAppConfig } from '../app/app.config';
import 'rxjs/Rx';

@Injectable()
export class MyHTTP {

  constructor(public http: Http, public rc: ResponseCache, @Inject(APP_CONFIG) public config: IAppConfig) {

  }

  request(options, customeOptions: any = {} ) {
    if (customeOptions.useCache && this.rc.hasKey(options.method + options.url)) {
      //Naive example (This Observable create syntax not yet supported)
      //There's a cached response for this url, return it instead of performing request
      return Observable.from([this.rc.get(options.method + options.url)]);
    }

    var req = new Request(options);
    return this.http.request(req)
      .do(res => {
        if (customeOptions.useCache) {
          this.rc.set(options.method + options.url, res);
        }
      })
      .timeout(customeOptions.timeout || this.config.httpTimeout, new Error('服务器连接超时'));
  }

  get(url, options, customeOptions: any = {}) {
    options.method = RequestMethod.Get;
    options.url = url;
    if (!customeOptions.noAuth) {
      options.search = options.search || new URLSearchParams();
      options.search.append('user', localStorage.getItem('hjy_uid'));
      options.search.append('access_token', localStorage.getItem('hjy_auth_token'));
    }
    return this.request(options, customeOptions);
  }

  post(url, params, options, customeOptions: any = {}) {
    options.method = RequestMethod.Post;
    options.url = url;
    if (!customeOptions.noAuth) {
      params = params || new URLSearchParams();
      params.append('user', localStorage.getItem('hjy_uid'));
      params.append('access_token', localStorage.getItem('hjy_auth_token'));
    }
    options.body = params.toString();
    return this.request(options, customeOptions);
  }

  put(url, params, options, customeOptions: any = {}) {
    options.method = RequestMethod.Put;
    options.url = url;
    if (!customeOptions.noAuth) {
      params = params || new URLSearchParams();
      params.append('user', localStorage.getItem('hjy_uid'));
      params.append('access_token', localStorage.getItem('hjy_auth_token'));
    }
    options.body = params.toString();
    return this.request(options, customeOptions);
  }

  delete(url, options, customeOptions = {}) {
    options.method = RequestMethod.Delete;
    options.url = url;
    return this.request(options, customeOptions);
  }
}
