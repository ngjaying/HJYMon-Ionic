import { OpaqueToken } from "@angular/core";

export let APP_CONFIG = new OpaqueToken("app.config");

export interface IAppConfig {
    host: string;
    apiEndpoint: string;
    articlePageNum: number;
    httpTimeout: number;
    loaderDuration: number;
    accessToken: string;
}

export const AppConfig: IAppConfig = {
    host: 'http://192.168.31.196',
    apiEndpoint: 'http://192.168.31.196/api',
    articlePageNum: 6,
    httpTimeout: 5000,
    loaderDuration: 5500,
    accessToken: 'jccRRzT2P2UXwibR1DPfGrFJf7UMN5zS'
};
