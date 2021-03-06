import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View, StyleSheet, Alert} from "react-native";
import firebase from "firebase";
import axios from "axios";
import {BASE_URL} from "../constants/baseURL";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const CardNotif = (props) => {

  console.log(props.image)
  console.log(props.title)
  console.log('delete', props.handleDelete());

  const notifsList = props.notifsList
  const [visible, setVisible] = useState(true);

  const deletedNotif = props.handleDelete();

  const user = props.user;

  const goodNotifsList = notifsList.filter(function( obj ) {
    return obj._id !== deletedNotif._id;
  });

  const navigation = useNavigation()
  const deleteNotifs = async () => {
    const userId = await AsyncStorage.getItem("userId");
    await axios.put(`${BASE_URL}/api/users/unreadmessages`, {
      id: userId,
    });
    await axios.put(`${BASE_URL}/api/users`, {
      id: user._id,
      notifications: goodNotifsList,
    }).then(() => props.handleNavigationAfterDelete());
  };

  const createTwoButtonAlert = () =>
      Alert.alert(
          "Supprimer la notification",
          "Vous êtes sur le point de supprimer une notification, Etes vous sur de vouloir la supprimer? (cette action est irréversible).",
          [
            {
              text: "Annuler",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => deleteNotifs() },
          ]
      );

  return (
      <View>
        {visible ? (
        <View style={styles.messageHyperContainer}>
          <TouchableOpacity style={styles.messageSuperContainer} onPress={props.handleNavigation}>
            <View style={styles.messageContainer}>
              <Image
                source={{uri: props.image}}
                style={styles.image}
              />
              <View style={styles.nameContainer}>
                <Text style={styles.pseudoText}>{props.title}</Text>
              </View>
            </View>
            <View style={styles.previewMessage}>
              <Text style={styles.timeText}>{props.body}</Text>
              <TouchableOpacity onPress={createTwoButtonAlert}>
                <Text style={styles.suppr}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
        ) : (
            <></>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(231, 233, 236, 0.26)',
    width: '100%',
    alignItems: 'center'
  },
  message: {
    borderBottomWidth: 3,
    borderBottomColor: '#DADADA',
    textAlign: 'center',
    padding: '5%',
    width: '50%',
    alignItems: 'center'
  },
  messageBorder: {
    borderBottomWidth: 3,
    borderBottomColor: '#D51317',
    textAlign: 'center',
    padding: '5%',
    width: '50%',
    alignItems: 'center'
  },
  messageText: {
    fontSize: 18
  },
  nameContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '5%'
  },
  pseudoText: {
    fontSize: 18
  },
  previewMessage: {
    marginTop: '5%',
    marginLeft: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  messageSuperContainer: {
    padding: '5%',
    width: '90%'
  },
  suppr: {
    color: "red"
  },
  timeText: {
    fontSize: 14,
    color: '#B5B5BE'
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
  },
  image: {
    width: 100,
    height: 100
  }
});
export default CardNotif;
