import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import firebase from "firebase";

import * as Notifications from "expo-notifications";
import axios from "axios";

const AllSetScreen = (props) => {
    const initialValues = {
        pseudo: "",
        email: "",
        password: "",
    };

    const params = props.route.params;
    console.log('params', params);

    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    console.log("err", err);

    const handleSubmit =  async () => {
        try {
             await firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection("unreadMessage")
                .doc("firstKey")
                .set({
                    count: 1,
                });
        } catch (err) {
            console.log(err)
        }

        console.log("1")

        try {
            await firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    pseudo: params.pseudo,
                    email: params.email,
                    nom: params.nom,
                    phone: params.phone,
                    id: firebase.auth().currentUser.uid,
                    prenom: params.prenom,
                    pushToken: params.pushToken,
                    portefeuille: 0,
                });
        } catch (err) {
            console.log(err)
        }
        setIsLoading(false)
        props.setIsLoggedIn(true)
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Text style={styles.title}>Tout on est bon !</Text>

                {isLoading ? <ActivityIndicator color="black" size={30}/> :
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={async () => await handleSubmit()}
                    >
                        <Text style={styles.createCompte}>Démarrer</Text>
                    </TouchableOpacity>
                }

            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#D51317",
        alignItems: "center",
    },
    err: {
        color: "black",
        fontSize: 15,
        textAlign: "center",
        marginTop: 20,
    },
    title: {
        fontSize: 27,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    textInput: {
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: "4%",
        marginTop: "2%",
        paddingLeft: "8%",
        color: "white",
    },
    buttonContainer: {
        backgroundColor: "white",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 1,
        shadowColor: "grey",
        width: "80%",
        paddingVertical: "5%",
        borderRadius: 10,
        marginTop: "20%",
    },
    createCompte: {
        color: "black",
        fontSize: 18,
        textAlign: "center",
    },
    text: {
        color: "white",
        fontSize: 18,
        marginTop: "15%",
    },
    connecteContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: "10%",
    },
    connecte: {
        marginTop: "4.5%",
    },
    text2: {
        color: "white",
        fontSize: 18,
        marginTop: "10%",
    },
    formContainer: {
        width: "70%",
    },
});

export default AllSetScreen;
