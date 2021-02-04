import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({navigation : {setOptions}, route}) => {
    setOptions({title : "aroundthistime"})
    const {
        params : {chatId}
    } = route;
    return (
    <View>
        <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
            <Text>Chat</Text>
        </TouchableOpacity>
    </View>
)}