import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ({navigation : {setOptions}}) => {
    setOptions({title : "aroundthistime"})
    return (
    <View>
        <TouchableOpacity onPress={() => navigation.navigate("Chats")}>
            <Text>Chat</Text>
        </TouchableOpacity>
    </View>
)}