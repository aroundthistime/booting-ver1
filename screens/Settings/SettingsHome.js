import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({navigation}) => (
    <View>
        <Text>Settings</Text>
        <TouchableOpacity onPress={() => navigation.navigate("UserSettings")}>
            <Text>계정</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("AlertSettings")}>
            <Text>알림</Text>
        </TouchableOpacity>
    </View>
)