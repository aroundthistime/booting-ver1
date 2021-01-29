import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
// import Chats from "../screens/Chats/Chats";
// import Settings from "../screens/Settings/SettingsHome";
import ChatNavigation from "./ChatNavigation";
// import SettingsHome from "../screens/Settings/SettingsHome";
import SettingsNavigation from "./SettingsNavigation";
import TabIcon from "../components/TabIcon";
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
    <TabNavigation.Navigator tabBarOptions={{
        showLabel : false,
        tabStyle : {
            backgroundColor : "#FAFAFA"
        }
    }}>
        <TabNavigation.Screen
            name="Home"
            component={Home}
            options={{
                tabBarIcon : ({focused}) => focused
                ? <TabIcon name="user-alt" group="fontAwemsome5" color="rgba(100, 100, 100, 0.9)" />
                : <TabIcon name="user" group="fontAwemsome5" />
            }}
        />
        <TabNavigation.Screen
            name="Chats"
            component={ChatNavigation}
            options={{
                tabBarIcon : ({focused}) => focused
                ? <TabIcon name="chatbubble-ellipses" size={24} color="rgba(100, 100, 100, 0.9)" />
                : <TabIcon name="chatbubble-ellipses-outline" size={24} />
            }}
        />
        <TabNavigation.Screen
            name="Settings"
            component={SettingsNavigation}
            options={{
                tabBarIcon : ({focused}) => focused
                ? <TabIcon name="cog" group="fontAwemsome5" color="rgba(100, 100, 100, 0.9)"/>
                : <TabIcon name="cog" group="fontAwemsome5" color="rgba(100, 100, 100, 0.3)"/>
            }}
        />
    </TabNavigation.Navigator>
)