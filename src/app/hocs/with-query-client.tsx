import {QueryClientProvider} from '@tanstack/react-query';
import React, {ComponentType, FC} from 'react';
import {apiQueryClient} from '@shared/api/query-client.ts';

export const withQueryClient = <P extends object>(Component: ComponentType<P>): FC<P> => (props: P) => {
    return (
        <QueryClientProvider client={apiQueryClient}>
            <Component {...props} />
        </QueryClientProvider>
    );
};
