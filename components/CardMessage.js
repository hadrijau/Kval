import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator} from "react-native";
import UserAvatar from "react-native-user-avatar";
import firebase from "firebase";
import axios from "axios";
import {BASE_URL} from "../constants/baseURL";
import {useNavigation} from "@react-navigation/core";

const CardMessage = ({
  pseudoVendeur,
  latestMessage,
  onPress,
    id,
    setUpdate,
  idAcheteur,
  idVendeur,
}) => {

  console.log(latestMessage)
  let trimedMessage = latestMessage.substring(0, 25);
  const [visible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation();

  const deleteMessage = async () => {
    await axios.delete(`${BASE_URL}/api/messages/${id}`).then(() => {
      navigation.navigate('SupressionMessageValidationScreen')
    });
  };

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Supprimer la conversation",
      "Vous êtes sur le point de supprimer une conversation, Etes vous sur de vouloir la supprimer? (cette action est irréversible).",
      [
        {
          text: "Annuler",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteMessage() },
      ]
    );

  return (
    <View>
        {isLoading ? <ActivityIndicator/> :

            <>
              {visible ? (
                  <View style={styles.messageHyperContainer}>
                    {pseudoVendeur && (
                        <TouchableOpacity
                            style={styles.messageSuperContainer}
                            onPress={onPress}
                        >
                          <View style={styles.messageContainer}>
                            <UserAvatar size={50} name={pseudoVendeur.charAt(0)} />
                            <View style={styles.nameContainer}>
                              <Text style={styles.pseudoText}>{pseudoVendeur}</Text>
                            </View>
                          </View>
                          <View style={styles.previewMessageContainer}>
                            <View style={styles.previewMessage}>
                              <Text style={styles.timeText}>{trimedMessage}...</Text>
                            </View>
                            <View>
                              <TouchableOpacity onPress={createTwoButtonAlert}>
                                <Text style={styles.suppr}>Supprimer</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </TouchableOpacity>
                    )}
                  </View>
              ) : (
                  <></>
              )}
            </>
        }

    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "grey",
    color: "red",
  },
  previewMessageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  suppr: {
    color: "red",
  },
  container: {
    backgroundColor: "white",
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(231, 233, 236, 0.26)",
    width: "100%",
    alignItems: "center",
  },
  message: {
    borderBottomWidth: 3,
    borderBottomColor: "#DADADA",
    textAlign: "center",
    padding: "5%",
    width: "50%",
    alignItems: "center",
  },
  messageBorder: {
    borderBottomWidth: 3,
    borderBottomColor: "#D51317",
    textAlign: "center",
    padding: "5%",
    width: "50%",
    alignItems: "center",
  },
  messageText: {
    fontSize: 18,
  },
  nameContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "5%",
  },
  pseudoText: {
    fontSize: 18,
  },
  previewMessage: {
    marginLeft: "20%",
    marginBottom: "2%",
  },
  messageSuperContainer: {
    paddingLeft: "5%",
    width: "90%",
    height: "100%",
  },
  timeText: {
    fontSize: 14,
    color: "#B5B5BE",
  },
  messageContainer: {
    display: "flex",
    flexDirection: "row",
  },
  messageHyperContainer: {
    paddingTop: 10,
    borderBottomWidth: 1,
    height: 90,
  },
});
export default CardMessage;
