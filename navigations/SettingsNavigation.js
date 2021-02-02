import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserSettings from "../screens/Settings/UserSettings";
import AlertSettings from "../screens/Settings/AlertSettings";
import SettingsHome from "../screens/Settings/SettingsHome";
import SetSettingsLink from "../components/SetSettingsLink";
import SettingsVersion from "../screens/Settings/SettingsVersion";

const SettingsNavigation = createStackNavigator();

export default () => (
    <SettingsNavigation.Navigator
        initialRouteName="SettingsHome"
        // screenOptions={{ gestureEnabled: false, headerShown : false }}
    >
        <SettingsNavigation.Screen 
            name="SettingsHome"
            component={SettingsHome}
            options={{title : "설정"}}
        />
        <SettingsNavigation.Screen 
            name="UserSettings"
            component={UserSettings}
            options={({navigation, route}) => ({
                title : "계정", 
                headerRight : () => <SetSettingsLink onPress={() => {
                    navigation.setParams({updateUser : true})
                }}/>
            })}
        />
        <SettingsNavigation.Screen 
            name="AlertSettings"
            component={AlertSettings}
        />
        <SettingsNavigation.Screen
            name="SettingsVersion"
            component={SettingsVersion}
            options={{
                title : "버전정보"
            }}
        />
    </SettingsNavigation.Navigator>
)