import { useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import React, { Suspense } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components";
import Loader from "../../components/Loader";
import constants from "../../constants";
import useInput from "../../Hooks/useInput";
import styles from "../../styles";
import { getUserObj } from "../../UserContext";
import { getOpponent } from "../../utils";

import { GET_CHAT } from "./ChatQueries";

const ChatInputContainer = styled.View`
    flex-direction : row;
    width : ${constants.width}
    position : absolute;
    bottom : 0;
    left : 0;
    background-color : ${props => props.theme.bgColor}
    
`

const ChatInput = styled.TextInput`
    padding-top : 15;
    padding-bottom : 15;
    padding-left : 15;
    padding-right : 15;
    flex : 1;
`

const ChatSendBtn = styled.TouchableOpacity`
    justify-content : center;
    align-items : center;
    width : 40;
`

const FONT_SIZE = 20;

const NUMBER_OF_LINES = 4;

export default ({navigation, route}) => {
    const messageInput = useInput("");
    const {
        params : {chatId, opponentName}
    } = route;
    navigation.setOptions({title : opponentName});
    const {data, error} = useQuery(GET_CHAT, {
        suspend : true,
        variables : {
            id : chatId
        }
    });
    const userObj = getUserObj();
    let opponent;
    if (data && data.getChat){
        const {
            getChat : { participants }
        } = data;
        opponent = getOpponent(participants, userObj.id);
    }
    return (
        <Suspense fallback={<Loader />}>
            <KeyboardAwareScrollView
                style={{flex : 1, backgroundColor : styles.pastelBg, paddingBottom : FONT_SIZE * NUMBER_OF_LINES + 30}}
                // contentContainerStyle={{flexGrow: 1}}
            >
                <ScrollView style={{ paddingBottom : FONT_SIZE * NUMBER_OF_LINES + 20}}>

                </ScrollView>
            </KeyboardAwareScrollView>
            <ChatInputContainer>
                <ChatInput
                    {...messageInput}
                    multiline
                    numberOfLines={NUMBER_OF_LINES}
                    placeholder=""
                    maxHeight={FONT_SIZE * NUMBER_OF_LINES + 30}
                />
                <ChatSendBtn>
                    <Ionicons name="paper-plane-sharp" size={24} color="black" />
                </ChatSendBtn>
            </ChatInputContainer>
            {/* {data.getChat.messages.map(message => <Text>{message.text}</Text>)} */}

        </Suspense>
)};