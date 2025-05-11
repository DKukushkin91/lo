import React, {ComponentType, FC} from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {commonStyles} from '@shared/styles/common.ts';

export const withSafeAreaView = <P extends object>(Component: ComponentType<P>): FC<P> => (props: P) => (
    <SafeAreaProvider>
        <SafeAreaView
            edges={['top']}
            style={commonStyles.safeAreaView}
        >
            <Component {...props} />
        </SafeAreaView>
    </SafeAreaProvider>
);
