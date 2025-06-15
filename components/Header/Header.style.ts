import {  StyleSheet } from 'react-native';

export const s = StyleSheet.create({
    header: {
        // paddingBottom: 20,
        alignItems: "flex-start",
        flexDirection: "column",
    },
    img: {
        alignSelf: "flex-start", // This one matters
        marginBottom: 10, // This is just fine
    },
    subtitle: {
        marginTop: -20,
        fontSize: 20,
        color: "#ABABAB",
        textAlign: "left", // Ensures text is left-aligned
        alignSelf: "flex-start", // Ensures the subtitle is aligned to the left
    }
});