import {FlashList} from '@shopify/flash-list';
import {useMemo} from 'react';
import {View} from 'react-native';
import {useIdentityStore} from '@entities/identity';
import {postsApi, type IPostFeed, PostsFeedCard} from '@entities/posts';
import Preloader from '@shared/ui/preloader';
import styles from './styles';

const Posts = () => {
    const isAuthTokenRefreshing = useIdentityStore.use.isRefreshing();
    const auth = useIdentityStore.use.auth();

    const {
        postsFeed,
        isLoadingPostsFeed,
        isFetchingNextPagePostsFeed,
        isFetchingPostsFeed,
        fetchPostsFeedNextPage,
        hasPostsFeedNextPage,
        refetchPostsFeed,
    } = postsApi.useGetPostsFeed(!isAuthTokenRefreshing && Boolean(auth?.access_token));

    const posts = useMemo(() => postsFeed?.pages?.flatMap((page) => page.items), [postsFeed]);

    const getKeyExtractor = (_item: IPostFeed, index: number) => `${index}`;

    const handleRefresh = async () => {
        await refetchPostsFeed();
    };

    const handleEndReached = async () => {
        if (posts?.length && hasPostsFeedNextPage && !isFetchingNextPagePostsFeed) {
            await fetchPostsFeedNextPage();
        }
    };

    if (isLoadingPostsFeed) {
        return <Preloader isFullView />;
    }
    return (
        <View style={styles.container}>
            <FlashList
                data={posts}
                refreshing={isFetchingPostsFeed}
                renderItem={({item}) => <PostsFeedCard post={item} />}
                keyExtractor={getKeyExtractor}
                estimatedItemSize={342}
                ListFooterComponent={() => {
                    if (isFetchingNextPagePostsFeed) {
                        return <Preloader viewStyle={styles.preloader} />;
                    }
                    return null;
                }}
                onEndReachedThreshold={2}
                onEndReached={handleEndReached}
                onRefresh={handleRefresh}
            />
        </View>
    );
};

export default Posts;
