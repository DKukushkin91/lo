import axios from 'axios';
import {ApiBaseUrls} from '@shared/api/base-urls.ts';
import {Scopes} from '@shared/api/scopes.ts';

const apiScope = __DEV__ ? Scopes.Dev : Scopes.Prod;

export const apiBaseClient = axios.create({
    baseURL: ApiBaseUrls[apiScope],
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
