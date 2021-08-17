import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, FlatList} from 'react-native';
import firebase from "firebase";
import * as notifsActions from '../../store/actions/notifications';
import {useDispatch, useSelector} from "react-redux";
import CardNotif from "../../components/CardNotif";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import UserAvatar from 'react-native-user-avatar';
import CardMessage from "../../components/CardMessage";


const MessageScreen = (props) => {

  const [messageActive, setMessageActive] = useState(true);
  const [notifActive, setNotifActive] = useState(false);


  let initial;


  const dispatch = useDispatch()
  const [notificationsTitle, setNotificationsTitle] = useState([])
  useEffect(() => {
    dispatch(notifsActions.fetchNotifs())
  }, [])

  const notifsList = useSelector(state => state.notifs.notifs)

  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('woskdls')
    const unsubscribe = firebase.firestore()
      .collection('MESSAGE_THREADS')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          console.log('wesh')
          if (documentSnapshot.id.includes(firebase.auth().currentUser.uid)) {
            return {
              _id: documentSnapshot.id,
              pseudoVendeur: documentSnapshot.data().pseudoVendeur,
              latestMessage: { text: '' },
              ...documentSnapshot.data()
            }
          }
        })
        setThreads(threads)
        if (loading) {
          setLoading(false)
        }
      })
    return () => unsubscribe()
  }, [])


  console.log('authid', firebase.auth().currentUser.uid)
  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        <TouchableOpacity style={messageActive ? styles.messageBorder : styles.message} onPress={() => {
          setMessageActive(true)
          setNotifActive(false)
        }}>
          <Text style={styles.messageText}>Messagerie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={notifActive ? styles.messageBorder : styles.message} onPress={() => {
          setMessageActive(false)
          setNotifActive(true)
        }}>
          <Text style={styles.messageText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      {messageActive && (
          <FlatList
            data={threads}
            style={styles.flatList}
            keyExtractor={(item) =>  item._id}
            renderItem={(itemData ) => {
              return (

                  <CardMessage
                    pseudoVendeur={itemData.item.pseudoVendeur}
                    latestMessage={itemData.item.latestMessage.text}
                    onPress={() => props.navigation.navigate('ChatScreen', {thread: itemData.item})}
                  />
                  )

                  {/*
                  <View style={styles.messageHyperContainer}>
                  {itemData.item!==undefined ?
                      <TouchableOpacity style={styles.messageSuperContainer} onPress={() => props.navigation.navigate('ChatScreen', {thread: item})}>
                        <View style={styles.messageContainer}>
                          <UserAvatar
                              size={50}
                              name={(itemData.item.pseudoVendeur).charAt(0)}
                          />
                          <View style={styles.nameContainer}>
                            <Text style={styles.pseudoText}>{itemData.item.pseudoVendeur}</Text>
                          </View>
                        </View>
                        <View style={styles.previewMessage}>
                          <Text style={styles.timeText}>{itemData.item?.latestMessage.text}</Text>
                        </View>
                      </TouchableOpacity> : <Text/>
            }
                  </View>
                  */}

            }}
          />
      )}

      {notifActive && (
        <FlatList
          data={notifsList}
          keyExtractor={() => (Math.random()*  100000).toString()}
          renderItem={itemData => {
            console.log(itemData)
            return (
            <CardNotif
              title={itemData.item.notificationsTitle}
              body={itemData.item.notificationsBody}
              image={itemData.item.image}
            />
          )}}
        />
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: 'grey',
    color: 'red'
  },
  container: {
    backgroundColor: 'white'
  },
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
    marginLeft: '5%',
  },
  pseudoText: {
    fontSize: 18
  },
  previewMessage: {
    marginLeft: '20%',
    marginBottom: '2%'
  },
  messageSuperContainer: {
    paddingLeft: '5%',
    width: '90%',
    height: '100%',
  },
  timeText: {
    fontSize: 14,
    color: '#B5B5BE'
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  messageHyperContainer: {
    padding: 0,
    borderTopWidth: 1
  },
  flatList: {
    height: '100%'
  }
})
export default MessageScreen;
