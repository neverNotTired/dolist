import { StyleSheet } from 'react-native';

export const s = StyleSheet.create({
    safeArea: {
        backgroundColor: '#111a22',
    },
    app: {
        flex: 1,
        backgroundColor: '#111a22',
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 0,
        paddingLeft: 20,
    },
    body: {
        flex: 5,
    },
    input: {
        color: '#4278da',
        fontSize: 14,
    },
    btn: {
        color: '#4278da',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        height: 70,
        backgroundColor: '#111a22',
    },
    modalContainer: {
        justifyContent: 'flex-start', // this affects backdrop alignment
        alignItems: 'flex-start',
    },

    modalContent: {
        alignSelf: 'flex-start', // moves the dialog box to the left
        backgroundColor: '#243647', // override if needed
        borderRadius: 10,
        padding: 20,
        // optional: width: '80%' or a fixed width
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },

    modalText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
    },

    modalHint: {
        fontSize: 14,
        color: '#ABABAB',
        marginBottom: 20,
        marginLeft: 12,
    },

});