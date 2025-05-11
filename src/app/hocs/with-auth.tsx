import React, {ComponentType, FC, useEffect, useRef} from 'react';
import {GrantTypes, identityApi, useIdentityStore} from '@entities/identity';
import {isNeedRefreshToken} from '@entities/identity';
import {useSystemStore} from '@entities/system';

const CLIENT_ID = '2';

export const withAuth = <P extends object>(Component: ComponentType<P>): FC<P> => (props: P) => {
    const auth = useIdentityStore.use.auth();
    const systemInfo = useSystemStore.use.info();
    const setIsRefreshing = useIdentityStore.use.setIsRefreshing();

    const {
        mutateToken,
    } = identityApi.useCreateToken();

    const isFirstRender = useRef(true);

    const initialized = async () => {
        if (isFirstRender.current && auth?.refresh_token && auth?.expires_in && isNeedRefreshToken(auth.expires_in)) {
            isFirstRender.current = false;

            try {
                setIsRefreshing(true);

                await mutateToken({
                    grant_type: GrantTypes.RefreshToken,
                    client_id: CLIENT_ID,
                    refresh_token: auth.refresh_token,
                    ...systemInfo,
                });
            } finally {
                setIsRefreshing(false);
            }
        }
    };

    useEffect(() => {
        initialized();
    }, []);

    return <Component {...props} />;
};
