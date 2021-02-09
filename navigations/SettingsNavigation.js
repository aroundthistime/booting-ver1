import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsHome from "../screens/Settings/SettingsHome";

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
    </SettingsNavigation.Navigator>
)