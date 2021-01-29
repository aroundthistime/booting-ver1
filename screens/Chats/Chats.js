import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import ViewContainer from "../../components/ViewContainer";

export default ({navigation}) => (
    <ViewContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Text>Chats</Text>
        </TouchableOpacity>
    </ViewContainer>
)