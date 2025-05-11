import {RouteProp, ParamListBase} from '@react-navigation/native';

export type TScreenRouteProp<ParamList extends ParamListBase, Name extends keyof ParamList> = RouteProp<ParamList, Name>;
