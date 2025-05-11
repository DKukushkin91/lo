import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {fonts} from './fonts';

export const typographyStyles = StyleSheet.create({
    H1: {
        fontFamily: fonts.semiBold,
        fontSize: 32,
        lineHeight: 40,
        letterSpacing: -0.4,
        color: colors.gray90,
    },

    H2: {
        fontFamily: fonts.semiBold,
        fontSize: 22,
        lineHeight: 28,
        letterSpacing: -0.4,
        color: colors.gray90,
    },

    H3: {
        fontFamily: fonts.semiBold,
        fontSize: 18,
        lineHeight: 24,
        letterSpacing: -0.4,
        color: colors.gray90,
    },

    textLg: {
        fontFamily: fonts.regular,
        fontSize: 16,
        lineHeight: 22,
        letterSpacing: -0.4,
    },

    textLgMedium: {
        fontFamily: fonts.medium,
        fontSize: 16,
        lineHeight: 22,
        letterSpacing: -0.4,
    },

    textLgSemiBold: {
        fontFamily: fonts.semiBold,
        fontSize: 16,
        lineHeight: 22,
        letterSpacing: -0.4,
    },

    textMd: {
        fontFamily: fonts.regular,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.4,
    },

    textMdMedium: {
        fontFamily: fonts.medium,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.4,
    },

    textMdSemiBold: {
        fontFamily: fonts.semiBold,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: -0.4,
    },

    textSm: {
        fontFamily: fonts.regular,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: -0.4,
    },

    textSmSemiBold: {
        fontFamily: fonts.semiBold,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: -0.4,
    },
});
