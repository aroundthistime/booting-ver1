import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "../screens/Chats/Chat";
import Chats from "../screens/Chats/Chats";

const ChatNavigation = createStackNavigator();

export default () => (
    <ChatNavigation.Navigator
        initialRouteName="Chats"
        // screenOptions={{ gestureEnabled: false, headerShown : false }}
    >
        <ChatNavigation.Screen 
            name="Chats"
            component={Chats}
            options={{title : "채팅"}}
        />
        <ChatNavigation.Screen 
            name="Chat"
            component={Chat}
        />
    </ChatNavigation.Navigator>
)