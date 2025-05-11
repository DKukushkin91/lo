import {useState} from 'react';
import {useEffect} from 'react';
import {View} from 'react-native';
import {
    getBaseOs,
    getBrand,
    getBuildId,
    getBuildNumber,
    getBundleId,
    getCarrier,
    getDeviceId,
    getDeviceName,
    getInstallerPackageName,
    getIpAddress,
    getMacAddress,
    getManufacturer,
    getModel,
    getSystemName,
    getSystemVersion,
    getUserAgent,
    getVersion,
} from 'react-native-device-info';
import {IInfo, useSystemStore} from '@entities/system';
import {commonStyles} from '@shared/styles/common.ts';
import Preloader from '@shared/ui/preloader';
import styles from './styles';

const InitialPage = () => {
    const setSystemInfo = useSystemStore.use.setInfo();

    const initialize = async () => {
        let systemInfo = {} as IInfo;

        try {
            systemInfo.baseOS = await getBaseOs();
            systemInfo.buildId = await getBuildId();
            systemInfo.brand = getBrand();
            systemInfo.buildNumber = getBuildNumber();
            systemInfo.bundleId = getBundleId();
            systemInfo.carrier = await getCarrier();
            systemInfo.deviceId = getDeviceId();
            systemInfo.deviceName = await getDeviceName();
            systemInfo.ipAddress = await getIpAddress();
            systemInfo.installerPackageName = await getInstallerPackageName();
            systemInfo.macAddress = await getMacAddress();
            systemInfo.manufacturer = await getManufacturer();
            systemInfo.model = getModel();
            systemInfo.systemName = getSystemName();
            systemInfo.systemVersion = getSystemVersion();
            systemInfo.userAgent = await getUserAgent();
            systemInfo.version = getVersion();
        } catch (error) {
            console.error('Не удалось получить информацию о системе:', error);
        } finally {
            setSystemInfo(systemInfo);
        }
    };

    useEffect(() => {
        initialize();
    }, []);

    return (
        <View style={commonStyles.safeAreaView}>
            <Preloader
                viewStyle={styles.container}
                isFullView
            />
        </View>
    );
};

export default InitialPage;
