import {View} from 'react-native';
import {Posts} from '@widgets/posts';
import {commonStyles} from '@shared/styles/common.ts';

const PostsPage = () => {
    return (
        <View style={commonStyles.safeAreaView}>
            <Posts />
        </View>
    );
};

export default PostsPage;
