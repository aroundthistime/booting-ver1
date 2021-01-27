import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({navigation}) => (
    <View>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Text>Chats</Text>
        </TouchableOpacity>
    </View>
)