import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "firebase/app";
import { TabNavigator, AuthNavigator } from "./navigation/AppNavigator";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useSelector } from "react-redux";
import { LogBox } from "react-native";
import ReduxThunk from "redux-thunk";
import productReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import articleReducer from "./store/reducers/articlesEnVente";
import userReducer from "./store/reducers/users";
import * as Notifications from "expo-notifications";
import notifReducer from "./store/reducers/notifications";
import articleCommandeReducer from "./store/reducers/articlesCommandes";
import messageReducer from "./store/reducers/messages";
LogBox.ignoreLogs(["Setting a timer"]);
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StripeProvider } from "@stripe/stripe-react-native";
import AuthContext from "./context/authContext";

const firebaseConfig = {
  apiKey: "AIzaSyCkee21-SCCNxfS6co9SjW-PNfLTFTkdec",
  authDomain: "kval-occaz.firebaseapp.com",
  projectId: "kval-occaz",
  storageBucket: "kval-occaz.appspot.com",
  messagingSenderId: "40095874290",
  appId: "1:40095874290:web:9ae177535c519f10ec646b",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  articles: articleReducer,
  user: userReducer,
  notifs: notifReducer,
  commandes: articleCommandeReducer,
  messages: messageReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [loggedInAsVisit, setLoggedInAsVisit] = useState(false);
  const [firstLaunch, setFirstLaunch] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  let userId;
  useEffect(() => {
    const getUser = async () => {
      userId = await AsyncStorage.getItem("userId");
      console.log('userID', userId)
      if (!userId) {
        setIsLoggedIn(false)
        setSignedIn(false)
      } else {
        setIsLoggedIn(true)
        setSignedIn(true)
      }
    }
    getUser()
  }, [userId, loggedIn, signedIn]);

  return (
      <AuthContext.Provider value={{
        signedIn: signedIn,
        setSignedIn: setSignedIn
      }}>
        <Provider store={store}>
          <StripeProvider publishableKey="pk_test_51IzdhtInmXQPTRFWN4LviIiI076QyI4DoMdE81jVRjoSvWqm014VuVToGJnBQqZqOPdrDFHY2ab4HdbdGQtedvQb00h4AMmu25">
          <NavigationContainer>
            {loggedIn && signedIn ? (
              <TabNavigator
                loggedInAsVisit={loggedInAsVisit}
                setLoggedInAsVisit={setLoggedInAsVisit}
              />
            ) : (
              <AuthNavigator
                firstLaunch={firstLaunch}
                setFirstLaunch={setFirstLaunch}
                loggedInAsVisit={loggedInAsVisit}
                setIsLoggedIn={setIsLoggedIn}
                setLoggedInAsVisit={setLoggedInAsVisit}
              />
            )}
          </NavigationContainer>
          </StripeProvider>
        </Provider>
      </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
