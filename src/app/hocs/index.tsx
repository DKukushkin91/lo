import React, {ComponentType, FC} from 'react';
import {withApiSetup} from './with-api-setup.tsx';
import {withAuth} from './with-auth.tsx';
import {withNavigationContainer} from './with-navigation-container.tsx';
import {withQueryClient} from './with-query-client.tsx';
import {withSafeAreaView} from './with-safe-area-view.tsx.tsx';

const hocs = [
    withNavigationContainer,
    withSafeAreaView,
    withAuth,
    withApiSetup,
    withQueryClient,
];

export const withHocs = <P extends object>(Component: ComponentType<P>): FC<P> => {
    const WrappedComponent = hocs.reduce((Wrapped, provider) => {
        return provider(Wrapped);
    }, Component);

    return (props: P) => (
        <WrappedComponent {...props} />
    );
};
