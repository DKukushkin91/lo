import {ParamListBase} from '@react-navigation/native';
import {TScreenNavigationProp} from './screen-navigation-prop';
import {TScreenRouteProp} from './screen-route-prop';
import {TStackRootParamsList} from './stacks/root-params-list';

export type TNavigationStackRoutes<ParamList extends ParamListBase, Name extends keyof (ParamList & TStackRootParamsList)> = {
    route: TScreenRouteProp<ParamList & TStackRootParamsList, Name>;
    navigation: TScreenNavigationProp<ParamList & TStackRootParamsList, Name>;
};
