import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components"


export default ({navigation}) => (
    <View>
        <Text>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text>Sign up</Text>
        </TouchableOpacity>
    </View>
)