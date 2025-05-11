import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        rowGap: 12,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    image: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        width: '100%',
        height: 200,
        borderRadius: 12,
    },
    content: {
        rowGap: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
    },
});
