import {apiBaseClient} from '@shared/api/base-client.ts';
import {DateTimeHelper} from '@shared/lib/helpers/date-time.ts';
import {Endpoints} from '../config/endoints.ts';
import {GrantTypes} from '../config/grant-types.ts';
import {useIdentityStore as identityStore} from '../model/store.ts';

const CLIENT_ID = '2';

const TokenUtils = {
    isTokenExpiringSoon: (expires_in: number | null): boolean => {
        if (!expires_in) {
            return false;
        }

        const now = Date.now();
        return expires_in - now < DateTimeHelper.convertMinutesToMs(1);
    },

    shouldRefreshToken: (auth: any): boolean => {
        if (!auth?.access_token || !auth?.refresh_token || !auth?.expires_in) {
            return false;
        }
        return TokenUtils.isTokenExpiringSoon(auth.expires_in);
    },

    setAuthorizationHeader: (config: any, auth: any): void => {
        if (auth?.access_token) {
            config.headers.Authorization = `${auth.token_type} ${auth.access_token}`;
        }
    },
};

const TokenService = {
    refreshToken: async (refresh_token: string): Promise<boolean> => {
        try {
            const response = await apiBaseClient.post(Endpoints.Token, {
                grant_type: GrantTypes.RefreshToken,
                client_id: CLIENT_ID,
                refresh_token,
            });

            identityStore.getState().setAuth(response.data);
            return true;
        } catch (error) {
            console.error('Ошибка обновления токена:', error);
            return false;
        }
    },

    ensureValidToken: async (auth: any): Promise<boolean> => {
        if (!TokenUtils.shouldRefreshToken(auth) || !auth?.refresh_token) {
            return true;
        }

        const state = identityStore.getState();

        if (state.isRefreshing) {
            return true;
        }

        state.setIsRefreshing(true);

        try {
            return await TokenService.refreshToken(auth.refresh_token);
        } finally {
            state.setIsRefreshing(false);
        }
    },
};

export const interceptors = () => {
    apiBaseClient.interceptors.request.use(async (config) => {
        if (config.url === Endpoints.Token) {
            return config;
        }

        const state = identityStore.getState();
        await TokenService.ensureValidToken(state.auth);

        TokenUtils.setAuthorizationHeader(config, state.auth);
        return config;
    });

    apiBaseClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            const config = error.config;

            if (config.url === Endpoints.Token || config._retry || error.response?.status !== 401) {
                return Promise.reject(error);
            }

            const state = identityStore.getState();
            const refresh_token = state.auth?.refresh_token;

            if (!refresh_token || state.isRefreshing) {
                state.setAuth(null);
                return Promise.reject(error);
            }

            config._retry = true;
            state.setIsRefreshing(true);

            try {
                const success = await TokenService.refreshToken(refresh_token);

                if (success) {
                    TokenUtils.setAuthorizationHeader(config, state.auth);
                    return apiBaseClient(config);
                }
            } finally {
                state.setIsRefreshing(false);
            }

            state.setAuth(null);
            return Promise.reject(error);
        },
    );
};
