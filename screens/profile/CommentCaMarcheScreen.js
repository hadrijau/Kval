import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from "react-native";
import firebase from "firebase";
import {WebView} from "react-native-webview";


const CommentCaMarcheScreen = () => {
    const [url, setUrl] = useState(null);

    const downloadFile = async () => {
        firebase
            .storage()
            .ref()
            .child("documents/comment_ca_marche.pdf")
            .getDownloadURL()
            .then((url) => {
                console.log(url);
                setUrl(url);
            })
            .catch((error) => {
                console.log(err);
            });
    };

    useEffect(() => {
        downloadFile();
    }, []);

    return (
        <View style={styles.container}>
            <WebView
                bounces={false}
                source={{ uri: url }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CommentCaMarcheScreen;
