import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import AuthHome from "../screens/Auth/AuthHome";
import Login from "../screens/Auth/Login";
import AuthEmail from "../screens/Auth/AuthEmail";
import EmailAuthentication from "../screens/Auth/EmailAuthentication";
import SetPassword from "../screens/Auth/SetPassword";

const AuthNavigation = createStackNavigator();

export default () => (
    <AuthNavigation.Navigator
        initialRouteName="AuthHome"
        screenOptions={{ gestureEnabled: false, headerShown : false }}
    >
        <AuthNavigation.Screen
            name="AuthHome"
            component={AuthHome}
            options={{title : "환영합니다"}}
        />
        <AuthNavigation.Screen
            name="Login"
            component={Login}
            options={{title : "로그인"}}
        />
        <AuthNavigation.Screen
            name="AuthEmail"
            component={AuthEmail}
            options={{title : "회원가입"}}
        />
        <AuthNavigation.Screen
            name="EmailAuthentication"
            component={EmailAuthentication}
            options={{title : "이메일 인증"}}
        />
        <AuthNavigation.Screen
            name="SetPassword"
            component={SetPassword}
            options={{title : "비밀번호 변경"}}
        />
    </AuthNavigation.Navigator>
)