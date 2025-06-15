import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    card: {
        backgroundColor: "#243647",
        borderRadius: 10,
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        position: "relative",
    },
    cardOne: {
        marginTop: 40,
    },
    cardInner: {
        position: "relative",
    },
    tickContainer: {
        position: "absolute",
        right: 10,
        top: 10,
    },
    check: {
        position: "absolute",
        right: 10,
        top: 0,
        width: 20,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: "semibold",
        marginBottom: 10,
    },
    cardText: {
        fontWeight: "semibold",
        fontSize: 16,
        color: "#FFF"
    },
    cardButton: {
        backgroundColor: "#FF6347",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    cardButtonText: {
        color: "#fff",
        textAlign: "center",
    },
    cardRight: {
        position: "absolute",
        right: 0,
        top: 0,
    },
});