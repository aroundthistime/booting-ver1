import 'react-native-gesture-handler';
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { persistCache } from 'apollo-cache-persist';
import * as Notifications from 'expo-notifications';
import apolloOptions from './apolloOptions';
import { Asset } from 'expo-asset';
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemeProvider } from 'styled-components';
import styles from './styles';
import NavController from './components/NavController';
import { AuthProvider } from './AuthContext';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [notificationToken, setNotificationToken] = useState();
  const registerForPushNotificationsAsync = async() => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
}
  const preLoad = async() => {
    try{
      await AsyncStorage.clear();
      await Font.loadAsync({
        ...FontAwesome5.font
      });
      await Asset.loadAsync(require("./assets/logo.png"));
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage : AsyncStorage
      });
      const client = new ApolloClient({
        cache,
        request : async(operation) => {
          const token = await AsyncStorage.getItem("jwt");
          return operation.setContext({headers : { Authorization : `Bearer ${token}`}})
        },
        ...apolloOptions
      })
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true"){
        setIsLoggedIn(true);
      } else{
        setIsLoggedIn(false);
      }
      const token = await registerForPushNotificationsAsync();
      setNotificationToken(token);
      setLoaded(true);
      setClient(client);
    } catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    preLoad();
  }, [])
  return loaded  && client && isLoggedIn !== null ? (
      <NavigationContainer>
        <ApolloProvider client={client}>
          <ThemeProvider theme={styles}>
            <AuthProvider isLoggedIn={isLoggedIn}>
              <NavController token={notificationToken}></NavController>
            </AuthProvider>
          </ThemeProvider>
        </ApolloProvider>
      </NavigationContainer>
    ) : (
      <AppLoading></AppLoading>
    )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
