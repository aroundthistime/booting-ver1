import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import AuthHome from "../screens/Auth/AuthHome";
import Login from "../screens/Auth/Login";
import SignUp from "../screens/Auth/SignUp";

const AuthNavigation = createStackNavigator();

export default () => (
    <AuthNavigation.Navigator
        initialRouteName="AuthHome"
        screenOptions={{ gestureEnabled: false, headerShown : false }}
    >
        <AuthNavigation.Screen
            name="AuthHome"
            component={AuthHome}
            options={{title : "Welcome"}}
        />
                <AuthNavigation.Screen
            name="Login"
            component={Login}
            options={{title : "Login"}}
        />
                <AuthNavigation.Screen
            name="Signup"
            component={SignUp}
            options={{title : "Sign up"}}
        />
    </AuthNavigation.Navigator>
)