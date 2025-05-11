import React, {ComponentType, FC, useEffect, useRef} from 'react';
import {identityApiSetup} from '@entities/identity';
import {baseInterceptors} from '@shared/api/base-interceptors';

export const withApiSetup = <P extends object>(Component: ComponentType<P>): FC<P> => (props: P) => {
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            baseInterceptors();
            identityApiSetup.interceptors();
        }
    }, []);

    return <Component {...props} />;
};
