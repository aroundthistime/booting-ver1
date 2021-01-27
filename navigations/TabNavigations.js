import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
// import Chats from "../screens/Chats/Chats";
import Settings from "../screens/Settings";
import ChatNavigation from "./ChatNavigation";
// import { createStackNavigator } from "@react-navigation/stack";

// const Stack = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

// const stackFactory = (initialRoute, name, customConfig) => (
//     <Stack.Navigator>
//       <Stack.Screen
//         name={name}
//         component={initialRoute}
//         options={{ ...customConfig }}
//       />
//     </Stack.Navigator>
//   );
  

export default () => (
    <TabNavigation.Navigator>
        <TabNavigation.Screen name="Home" component={Home} />
        <TabNavigation.Screen name="Chats" component={ChatNavigation} />
        <TabNavigation.Screen name="Settings" component={Settings} />
    </TabNavigation.Navigator>
)