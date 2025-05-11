import {UseInfiniteQueryOptions, UseInfiniteQueryResult, UseQueryOptions, UseQueryResult, useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {apiBaseClient} from '@shared/api/base-client.ts';

interface IParams<Response, Params = void> {
    url: string;
    isInfinite?: boolean;
    params?: Params;
    options?: Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'> | Omit<UseInfiniteQueryOptions<Response, AxiosError, Response>, 'queryKey' | 'queryFn'>;
}

type QueryResult<Response, IsInfinite extends boolean> = IsInfinite extends true
    ? UseInfiniteQueryResult<Response, AxiosError>
    : UseQueryResult<Response, AxiosError>;

export const useFetchData = <Response, Params = void, IsInfinite extends boolean = false>({
    url,
    isInfinite,
    params,
    options,
}: IParams<Response, Params> & {isInfinite?: IsInfinite}): QueryResult<Response, IsInfinite> => {
    if (isInfinite) {
        return useInfiniteQuery<Response, AxiosError, Response>({
            queryKey: ['QUERY_KEY_', url, params],
            queryFn: async ({queryKey, pageParam}) => {
                const [_key, url, params] = queryKey;
                const queryParams = params ? {...params} : {};
                const response = await apiBaseClient.get<Response>(
                    url as string,
                    {params: {
                        ...queryParams,
                        offset: pageParam,
                    }},
                );

                return response.data;
            },
            ...((options as Omit<UseInfiniteQueryOptions<Response, AxiosError, Response>, 'queryKey' | 'queryFn'>)),
        }) as QueryResult<Response, IsInfinite>;
    }
    return useQuery<Response, AxiosError>({
        queryKey: ['QUERY_KEY_', url, params],
        queryFn: async ({queryKey}) => {
            const [_key, url, params] = queryKey;
            const response = await apiBaseClient.get<Response>(
                url as string,
                {params},
            );

            return response.data;
        },
        ...(options as Omit<UseQueryOptions<Response>, 'queryKey' | 'queryFn'>),
    }) as QueryResult<Response, IsInfinite>;
};
