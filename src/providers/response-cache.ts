import { Injectable } from '@angular/core';

/*
  Generated class for the ResponseCache provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ResponseCache {

  cacheStorage = [];
  constructor() {
  }

  set(key: string, value: any){
    this.cacheStorage[key] = value;
  }

  get(key: string){
    return this.cacheStorage[key];
  }

  hasKey(key: string){
    return key in this.cacheStorage;
  }
}
