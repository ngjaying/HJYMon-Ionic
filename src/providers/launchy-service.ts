import { Injectable, Inject, Injector } from '@angular/core';
import { Headers } from '@angular/http';
import { BaseService } from './base-service';
import 'rxjs/Rx';

@Injectable()
export class LaunchyService extends BaseService {

  constructor(@Inject(Injector) private inj: Injector) {
    super(inj);
  }

  get() {
    return this.http.get(
      `${this.config.apiEndpoint}/launchies`, {}
    ).map((res) => {
      return this.handleRes(res);
    }).catch(this.handleError);
  }
}
