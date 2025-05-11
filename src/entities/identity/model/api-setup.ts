import {AxiosRequestHeaders} from 'axios';
import {apiBaseClient} from '@shared/api/base-client';
import {Endpoints} from '../config/endoints';
import {addAuthorizationHeader} from './auth-selectors';
import {clearAuthData} from './auth-store';
import {shouldRefreshToken, refreshToken} from './token-service';

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;
let refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
};

const onRefreshError = (error: any) => {
    refreshSubscribers = [];
    refreshPromise = null;
    return Promise.reject(error);
};

const executeRefreshToken = async () => {
    if (refreshPromise) {
        return refreshPromise;
    }

    isRefreshing = true;

    refreshPromise = refreshToken()
        .then((result) => {
            onTokenRefreshed(result.access_token);
            return result;
        })
        .catch((error) => {
            console.error('Не удалось обновить токен:', error);
            clearAuthData();
            onRefreshError(error);
            throw error;
        })
        .finally(() => {
            refreshPromise = null;
            isRefreshing = false;
        });

    return refreshPromise;
};

export const interceptors = () => {
    apiBaseClient.interceptors.request.use(
        async (config) => {
            if (config.url?.includes(Endpoints.Token)) {
                return config;
            }

            if (isRefreshing) {
                try {
                    await refreshPromise;
                } catch (error) {
                    console.warn('Ожидание обновления токена завершилось ошибкой:', error);
                }
            } else if (shouldRefreshToken()) {
                try {
                    await executeRefreshToken();
                } catch (error) {
                    console.warn('Обновление токена завершилось ошибкой:', error);
                }
            }

            config.headers = addAuthorizationHeader(config.headers ?? {}) as AxiosRequestHeaders;
            return config;
        },
    );

    apiBaseClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                if (isRefreshing) {
                    return new Promise((resolve, _reject) => {
                        subscribeTokenRefresh((_token) => {
                            originalRequest.headers = addAuthorizationHeader(originalRequest.headers ?? {});
                            resolve(apiBaseClient(originalRequest));
                        });
                    });
                }

                try {
                    await executeRefreshToken();
                    originalRequest.headers = addAuthorizationHeader(originalRequest.headers ?? {});
                    return apiBaseClient(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        },
    );
};
