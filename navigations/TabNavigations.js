import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabIcon from "../components/TabIcon";
import Home from "../screens/Home/Home";
import SettingsNavigation from "./SettingsNavigation";
import ChatNavigation from "./ChatNavigation";

const TabNavigation = createBottomTabNavigator();


export default () => (
    <TabNavigation.Navigator tabBarOptions={{
        showLabel : false,
        tabStyle : {
            backgroundColor : "#FAFAFA"
        },
    }}>
        <TabNavigation.Screen
            name="Home"
            component={Home}
            options={{
                tabBarIcon : ({focused}) => focused
                ? <TabIcon name="user-alt" group="fontAwemsome5" color="rgba(100, 100, 100, 0.9)" />
                : <TabIcon name="user" group="fontAwemsome5" />,
            }}
        />
        <TabNavigation.Screen
            name="Chats"
            component={ChatNavigation}
            options={{
                tabBarIcon : ({focused}) => focused
                ? <TabIcon name="chatbubble-ellipses" size={24} color="rgba(100, 100, 100, 0.9)" />
                : <TabIcon name="chatbubble-ellipses-outline" size={24} />,
            }}
        />
        <TabNavigation.Screen
            name="Settings"
            component={SettingsNavigation}
            options={{
                tabBarIcon : ({focused}) => focused
                ? <TabIcon name="cog" group="fontAwemsome5" color="rgba(100, 100, 100, 0.9)"/>
                : <TabIcon name="cog" group="fontAwemsome5" color="rgba(100, 100, 100, 0.3)"/>,
            }}
        />
    </TabNavigation.Navigator>
)