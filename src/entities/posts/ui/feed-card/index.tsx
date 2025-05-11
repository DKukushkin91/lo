import React from 'react';
import {Image, Text, View} from 'react-native';
import IPostFeed from '../../types/post-feed';
import styles from './styles';

interface IPostsFeedCardProps {
    post: IPostFeed;
}

export const PostsFeedCard = ({
    post,
}: IPostsFeedCardProps) => {
    const photoURI = post.photos[0]?.photo.md.src || post.photos[0]?.photo.original;

    return (
        <View style={styles.container}>
            { photoURI ? (
                <Image
                    source={{uri: photoURI}}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : null}

            <View style={styles.content}>
                <Text style={styles.title}>
                    {post.user.firstName}
                    {' '}
                    {post.user.lastName}
                </Text>

                {post.message ? (
                    <Text style={styles.description}>
                        {post.message}
                    </Text>
                ) : null}
            </View>
        </View>
    );
};

export default PostsFeedCard;
