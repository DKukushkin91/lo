import {getAuthData} from './auth-store';

export const isAuthenticated = (): boolean => {
    const auth = getAuthData();

    return Boolean(auth?.access_token);
};

export const buildAuthHeader = (): string | null => {
    const auth = getAuthData();

    return auth?.access_token && auth?.token_type ? `${auth.token_type} ${auth.access_token}` : null;
};

export const addAuthorizationHeader = (headers: Record<string, string>) => {
    const authHeader = buildAuthHeader();

    return authHeader ? {...headers, Authorization: authHeader} : headers;
};
