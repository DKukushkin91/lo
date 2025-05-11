import {apiBaseClient} from '@shared/api/base-client';
import {DateTimeHelper} from '@shared/lib/helpers/date-time';
import {Endpoints} from '../config/endoints';
import {GrantTypes} from '../config/grant-types';
import {isNeedRefreshToken} from '../lib/is-need-refresh-token';
import ICreateTokenResponse from '../types/create-token-response';
import {getAuthData, setAuthData, setIsRefreshing} from './auth-store';

const CLIENT_ID = '2';

let refreshTokenPromise: Promise<ICreateTokenResponse> | null = null;

export const shouldRefreshToken = (): boolean => {
    const auth = getAuthData();

    if (!auth) {
        return false;
    }

    const {
        access_token,
        expires_in,
    } = auth;

    return Boolean(access_token && expires_in && isNeedRefreshToken(expires_in));
};

export const refreshToken = async (): Promise<ICreateTokenResponse> => {
    const auth = getAuthData();

    if (!auth) {
        throw new Error('Токен обновления не найден');
    }

    const {refresh_token} = auth;

    if (refreshTokenPromise) {
        return refreshTokenPromise;
    }

    if (!refresh_token) {
        throw new Error('Токен обновления не найден');
    }

    setIsRefreshing(true);

    refreshTokenPromise = apiBaseClient
        .post(Endpoints.Token, {
            grant_type: GrantTypes.RefreshToken,
            client_id: CLIENT_ID,
            refresh_token,
        })
        .then((response) => {
            const newToken = response.data as ICreateTokenResponse;

            setAuthData(newToken);

            return newToken;
        });
    try {
        return await refreshTokenPromise;
    } finally {
        refreshTokenPromise = null;
        setIsRefreshing(false);
    }
};
