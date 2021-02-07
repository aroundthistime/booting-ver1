import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "../screens/Chats/Chat";
import Chats from "../screens/Chats/Chats";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const Container = styled.TouchableOpacity`
  padding-right: 20px;
  padding-top : 5px;
`;

const ShowModalsLink =  ({onPress}) => (
    <Container onPress={onPress}>
        <Ionicons name="ellipsis-vertical" size={24} color="rgba(0, 0, 0, 0.5)" />
    </Container>
)

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
            options={({navigation, route}) => ({
                headerRight : () => <ShowModalsLink onPress={() => {
                    navigation.setParams({
                        ...route.params,
                        showModal : true
                    })
                }}/>
            })}
        />
    </ChatNavigation.Navigator>
)