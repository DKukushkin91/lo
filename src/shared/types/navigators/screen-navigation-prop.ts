import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type TScreenNavigationProp<
    ParamList extends ParamListBase,
    Name extends keyof ParamList,
> = NativeStackScreenProps<ParamList, Name>;
