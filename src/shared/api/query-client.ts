import {QueryClient} from '@tanstack/react-query';

const FIVE_MINUTES = 5 * 60 * 1000;

export const apiQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: FIVE_MINUTES,
        },
        mutations: {
            retry: 0,
        },
    },
});
