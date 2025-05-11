import {DateTimeHelper} from '@shared/lib/helpers/date-time';

export const isNeedRefreshToken = (expiresIn: number): boolean => {
    return Boolean(expiresIn && expiresIn - Date.now() < DateTimeHelper.convertMinutesToMs(1));
};
