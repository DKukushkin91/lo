import ICreateTokenResponse from '../types/create-token-response';
import {useIdentityStore as identityStore} from './store';

export const setAuthData = (authData: ICreateTokenResponse): void => {
    identityStore.getState().setAuth({
        access_token: authData.access_token,
        refresh_token: authData.refresh_token,
        expires_in: Date.now() + authData.expires_in * 1000,
        token_type: authData.token_type,
    });
};

export const clearAuthData = (): void => {
    identityStore.getState().setAuth(null);
};

export const getAuthData = () => {
    return identityStore.getState().auth;
};

export const setIsRefreshing = (isRefreshing: boolean): void => {
    identityStore.getState().setIsRefreshing(isRefreshing);
};
