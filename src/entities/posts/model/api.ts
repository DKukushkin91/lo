import {useFetchData} from '@shared/lib/hooks/api/use-fetch-data';
import {Endpoints} from '../config/endpoints';
import IGetPostsFeedResponse from '../types/get-posts-feed-response';
import IGetPostsFeedResponseParams from '../types/get-posts-feed-response-params';

const PAGE_SIZE = 20;

export const useGetPostsFeed = (isAuthenticated: boolean, params?: IGetPostsFeedResponseParams) => {
    const {
        data,
        isFetchingNextPage,
        isFetching,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        status,
        refetch,
    } = useFetchData<IGetPostsFeedResponse, IGetPostsFeedResponseParams, true>({
        url: Endpoints.PostsFeed,
        isInfinite: true,
        params: {
            ...params,
            count: params?.count ?? PAGE_SIZE,
        },
        options: {
            enabled: isAuthenticated,
            initialPageParam: 0,
            getNextPageParam: (lastPage, _allPages, lastPageParam: number) => {
                const lastPageData = lastPage as unknown as IGetPostsFeedResponse['pages'][0];

                if (lastPageParam >= lastPageData.count) {
                    return undefined;
                }

                return lastPageParam + PAGE_SIZE;
            },
        },
    });

    return {
        postsFeed: data,
        refetchPostsFeed: refetch,
        isLoadingPostsFeed: status === 'pending',
        isFetchingNextPagePostsFeed: isFetchingNextPage,
        isFetchingPostsFeed: isFetching && !isFetchingNextPage,
        isErrorPostsFeed: isError,
        errorPostsFeed: error,
        fetchPostsFeedNextPage: fetchNextPage,
        hasPostsFeedNextPage: hasNextPage,
    };
};
