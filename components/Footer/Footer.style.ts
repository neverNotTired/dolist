import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    footer: {
        height: 40,
        backgroundColor: '#111a22',
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        borderTopColor: "#374151",
        borderTopWidth: 1,

    },
    baseStyle: {
        padding: 10
    },
    selectedText: {
        fontWeight: "bold",
    },
    notSelectedText: {
        fontWeight: "normal",
    },
});