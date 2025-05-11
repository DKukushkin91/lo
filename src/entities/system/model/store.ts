import {create} from 'zustand';
import {createSelectors} from '@shared/lib/zustand/create-selectors';

interface IStore {
    info: {
        baseOS: string;
        buildId: string;
        brand: string;
        buildNumber: string;
        bundleId: string;
        carrier: string;
        deviceId: string;
        deviceName: string;
        ipAddress: string;
        installerPackageName: string;
        macAddress: string;
        manufacturer: string;
        model: string;
        systemName: string;
        systemVersion: string;
        userAgent: string;
        version: string;
    } | null;
    setInfo: (info: IStore['info']) => void;
}

export const useSystemStore = createSelectors(create<IStore>((set) => ({
    info: null,
    setInfo: (info) => set({info}),
})));
