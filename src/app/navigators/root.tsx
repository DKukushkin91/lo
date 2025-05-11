import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Button} from '@rneui/base';
import {Fragment} from 'react';
import {AuthPage} from '@pages/auth';
import {InitialPage} from '@pages/initial';
import {PostsPage} from '@pages/posts';
import {identityApi, useIdentityStore} from '@entities/identity';
import {useSystemStore} from '@entities/system';
import {TStackRootParamsList} from '@shared/types/navigators/stacks/root-params-list.ts';

const Stack = createNativeStackNavigator<TStackRootParamsList>();

export const RootNavigator = () => {
    const systemInfo = useSystemStore.use.info();
    const isAuthenticated = Boolean(useIdentityStore.use.auth()?.access_token);
    const setAuth = useIdentityStore.use.setAuth();

    const {
        deleteToken,
        isPendingDeleteToken,
    } = identityApi.useDeleteToken();

    const handleLogoutPress = async () => {
        try {
            await deleteToken();
        } finally {
            setAuth(null);
        }
    };

    return (
        <Stack.Navigator
            initialRouteName="Initial"
            screenOptions={{
                headerShown: true,
                headerBackButtonDisplayMode: 'minimal',
            }}
        >
            {systemInfo ? (
                <Fragment>
                    {isAuthenticated ? (
                        <Stack.Screen
                            name="Posts"
                            component={PostsPage}
                            options={{
                                title: 'Посты',
                                headerRight() {
                                    return (
                                        <Button
                                            title="Выйти"
                                            size="sm"
                                            type="clear"
                                            loading={isPendingDeleteToken}
                                            onPress={handleLogoutPress}
                                        />
                                    );
                                },
                            }}
                        />
                    ) : (
                        <Stack.Screen
                            name="Auth"
                            component={AuthPage}
                            options={{
                                title: 'Авторизация',
                            }}
                        />
                    )}
                </Fragment>
            ) : (
                <Stack.Screen
                    name="Initial"
                    component={InitialPage}
                    options={{
                        headerShown: false,
                    }}
                />
            )}
        </Stack.Navigator>
    );
};
