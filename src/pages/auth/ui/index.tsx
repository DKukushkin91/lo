import {View} from 'react-native';
import {AuthLogin} from '@features/auth/login';
import {commonStyles} from '@shared/styles/common.ts';

const AuthPage = () => {
    return (
        <View style={commonStyles.safeAreaView}>
            <AuthLogin />
        </View>
    );
};

export default AuthPage;
