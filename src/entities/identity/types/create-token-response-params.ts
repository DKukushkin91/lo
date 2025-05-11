import {TGrantTypes} from '../config/grant-types';

export default interface ICreateTokenResponseParams {
    grant_type: TGrantTypes;
    client_id: string;
    refresh_token?: string;
    username?: string;
    password?: string;
    pushToken?: string;
    voipToken?: string;
    baseOS?: string;
    buildId?: string;
    brand?: string;
    buildNumber?: string;
    bundleId?: string;
    carrier?: string;
    deviceId?: string;
    deviceName?: string;
    ipAddress?: string;
    installerPackageName?: string;
    macAddress?: string;
    manufacturer?: string;
    model?: string;
    systemName?: string;
    systemVersion?: string;
    userAgent?: string;
    version?: string;
}
