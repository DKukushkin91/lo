import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {DateTimeHelper} from '@shared/lib/helpers/date-time';
import {MMKVHelper} from '@shared/lib/helpers/mmkv';
import {createSelectors} from '@shared/lib/zustand/create-selectors';

interface IStore {
    auth: {
        access_token: string | null;
        refresh_token: string | null;
        expires_in: number | null;
        token_type: string | null;
    } | null;
    isRefreshing: boolean;
    setIsRefreshing: (isRefreshing: boolean) => void;
    setAuth: (auth: IStore['auth']) => void;
}

export const useIdentityStore = createSelectors(create<IStore>()(
    persist((set) => ({
        auth: null,
        isRefreshing: false,
        setIsRefreshing: (isRefreshing) => set({isRefreshing}),
        setAuth: (auth) => set({
            auth: auth ? {
                ...auth,
                expires_in: auth?.expires_in ? Date.now() + DateTimeHelper.convertSecondsToMs(auth.expires_in) : null,
            } : null,
        }),
    }),
    {
        name: 'auth',
        storage: createJSONStorage(() => MMKVHelper.zustandStorage),
    },
    ),
));
