import {Input, Button} from '@rneui/base';
import {AxiosError} from 'axios';
import {useState} from 'react';
import {View, Alert} from 'react-native';
import * as v from 'valibot';
import {GrantTypes, identityApi, useIdentityStore} from '@entities/identity';
import {useSystemStore} from '@entities/system';
import {getError} from '@shared/lib/get-error';
import {ValidationSchema} from '../config/validation-schema';
import styles from './styles';

const PUSH_TOKEN = '8F3F9678B591116F8338F7BD4FDC5BD1C8A8B399D7E50B06F1869EA1E1B7606C';
const VOIP_TOKEN = '8F3F9678B591116F8338F7BD4FDC5BD1C8A8B399D7E50B06F1869EA1E1B7606C';
const CLIENT_ID = '2';

const AuthLogin = () => {
    const systemInfo = useSystemStore.use.info();
    const setAuth = useIdentityStore.use.setAuth();

    const [loId, setLoId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Record<string, string> | null>(null);

    const {
        mutateToken,
        isPendingToken,
    } = identityApi.useCreateToken();

    const login = async () => {
        try {
            v.parse(ValidationSchema, {
                loId,
                password,
            });

            if (systemInfo) {
                const response = await mutateToken({
                    grant_type: GrantTypes.Password,
                    client_id: CLIENT_ID,
                    username: loId,
                    password,
                    voipToken: VOIP_TOKEN,
                    pushToken: PUSH_TOKEN,
                    ...systemInfo,
                });

                setAuth(response);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                Alert.alert(error.response?.data.error.message);
            }
            setError(getError(error));
        }
    };

    const resetError = (key: string) => {
        if (error) {
            setError((prevState) => {
                const newState = {...prevState};

                delete newState[key];

                return newState;
            });
        }
    };

    const handleLoIdChange = (text: string) => {
        setLoId(text);
        resetError('loId');
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        resetError('password');
    };

    const handleLoginPress = async () => {
        await login();
    };

    return (
        <View style={styles.container}>
            <Input
                placeholder="Lo ID"
                value={loId}
                errorMessage={error?.loId}
                onChangeText={handleLoIdChange}
            />
            <Input
                secureTextEntry
                placeholder="Пароль"
                value={password}
                textContentType="password"
                errorMessage={error?.password}
                onChangeText={handlePasswordChange}
            />
            <Button
                style={styles.button}
                title="Войти"
                onPress={handleLoginPress}
                loading={isPendingToken}
            />
        </View>
    );
};

export default AuthLogin;
