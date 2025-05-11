import {Scopes} from '@shared/api/scopes.ts';

type TApiUrls = Record<Scopes, string>;

export const ApiBaseUrls: TApiUrls = {
    [Scopes.Prod]: 'https://api.lo.ink',
    [Scopes.Dev]: 'https://api.lo.ink',
};
