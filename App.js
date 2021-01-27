import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApolloClient, { InMemoryCache } from "apollo-boost"
import { ApolloProvider } from 'react-apollo-hooks';
import { persistCache } from 'apollo-cache-persist';
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
  const preLoad = async() => {
    try{
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
        ...apolloOptions
      })
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true"){
        setIsLoggedIn(true);
      } else{
        setIsLoggedIn(false);
      }
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
              <NavController></NavController>
            </AuthProvider>
            {/* <View>
              <Text>Open up App.js to start working on your app!</Text>
              <StatusBar style="auto" />
            </View> */}
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
