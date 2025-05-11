import {StyleProp, ViewStyle, View, ActivityIndicator, Text, useWindowDimensions, StyleSheet} from 'react-native';
import {colors} from '@shared/styles/colors';
import {typographyStyles} from '@shared/styles/typography';
import styles from './styles';

interface IProps {
    title?: string;
    viewStyle?: StyleProp<ViewStyle>;
    isFullView?: boolean;
}

const Preloader = ({
    title,
    viewStyle,
    isFullView,
}: IProps) => {
    const {
        width,
        height,
    } = useWindowDimensions();

    return (
        <View style={[
            styles.container,
            isFullView ? {
                width,
                height,
                backgroundColor: colors.gray10,
                zIndex: 10,
                ...StyleSheet.absoluteFillObject,
            } : {},
            viewStyle,
        ]}
        >
            <ActivityIndicator
                animating
                size="large"
                color={colors.gray70}
            />

            {title ? (
                <Text style={[
                    typographyStyles.H3,
                    styles.text,
                ]}
                >
                    {title}
                </Text>
            ) : null }
        </View>
    );
};

export default Preloader;
