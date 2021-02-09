import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigations from "./TabNavigations";
import UserSettings from "../screens/Settings/UserSettings";
import AlertSettings from "../screens/Settings/AlertSettings";
import SettingsVersion from "../screens/Settings/SettingsVersion";
import Chat from "../screens/Chats/Chat";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import SetSettingsLink from "../components/SetSettingsLink";


const Container = styled.TouchableOpacity`
  padding-right: 20px;
  padding-top : 5px;
`;

const ShowModalsLink =  ({onPress}) => (
    <Container onPress={onPress}>
        <Ionicons name="ellipsis-vertical" size={24} color="rgba(0, 0, 0, 0.5)" />
    </Container>
)

const getUserSettingsTitle = (settingsDone) => {
    if (settingsDone){
        return "계정"
    } else {
        return "프로필 작성"
    }
}

const LoggedInNavigation = createStackNavigator();

export default ({navigation, route, settingsDone}) => (
    <LoggedInNavigation.Navigator
        initialRouteName={settingsDone ? "Tabs" : "UserSettings"}
    >
        <LoggedInNavigation.Screen
            name="Tabs"
            component={TabNavigations}
            options={{
                headerShown : false
            }}
        />
        <LoggedInNavigation.Screen
            name="UserSettings"
            component={UserSettings}
            options={({navigation, route}) => ({
                title : getUserSettingsTitle(settingsDone), 
                headerRight : () => <SetSettingsLink onPress={() => {
                    navigation.setParams({updateUser : true})
                }}/>
            })}
        />
        <LoggedInNavigation.Screen
            name="AlertSettings"
            component={AlertSettings}
        />
        <LoggedInNavigation.Screen
            name="SettingsVersion"
            component={SettingsVersion}
            options={{
                title : "버전정보"
            }}
        />
        <LoggedInNavigation.Screen 
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
    </LoggedInNavigation.Navigator>
)