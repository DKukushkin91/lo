import {NavigationContainer} from '@react-navigation/native';
import React, {ComponentType, FC} from 'react';

export const withNavigationContainer = <P extends object>(Component: ComponentType<P>): FC<P> => (props: P) => (
    <NavigationContainer>
        <Component {...props} />
    </NavigationContainer>
);
