import {AxiosResponse, HttpStatusCode, InternalAxiosRequestConfig} from 'axios';
import {apiBaseClient} from './base-client';

export const baseInterceptors = () => {
    apiBaseClient.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            console.info(`[Request] ${config.method?.toUpperCase()} ${config.url}`, config);
            return config;
        },
        (error) => {
            console.error('[Request Error]', error);
            return Promise.reject(error);
        },
    );

    apiBaseClient.interceptors.response.use(
        (response: AxiosResponse) => {
            console.info(`[Response] ${response.status} ${response.config.url}`, response.data);
            return response;
        },
        (error) => {
            if (error.response) {
                console.error(
                    `[Response Error] ${error.response.status} ${error.config?.url}`,
                    error.response.data,
                );
            } else if (error.request) {
                console.error('[No Response]', error.request);
            } else {
                console.error('[Setup Error]', error.message);
            }

            return Promise.reject(error);
        },
    );

    apiBaseClient.interceptors.response.use((response) => {
        if (response.status === HttpStatusCode.Ok && response.data) {
            return {
                ...response,
                data: response.data.data,
            };
        }

        return response;
    });
};
