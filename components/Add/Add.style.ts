import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
    btn: {
       position: 'absolute',
        bottom: 10,
        right: 0,
        borderRadius: 5,
        backgroundColor: '#243647',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        zIndex: 2,
    },
    svg: {
        marginLeft: 2,
        width: 24,
        height: 24,
        flex: 1,
    }
});