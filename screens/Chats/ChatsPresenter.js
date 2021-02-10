import React, { useEffect, useState } from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { Alert, ScrollView } from "react-native";
import styled from "styled-components";
import styles from "../../styles";
import { getUserObj } from "../../UserContext";
import { chatsSortFunc, getOpponent, getTimeStamp } from "../../utils"
import { QUIT_CHAT, NEW_MESSAGE, NEW_CHAT } from "./ChatQueries";


const ChatTabsContainer = styled.View`
    background-color : rgba(0, 0, 0, 0.1);
`

const ChatTab = styled.TouchableOpacity`
    height : 70;
    flex-direction : row;
    align-items : center;
    padding-left : 20;
    padding-right : 10;
    padding-top : 10;
    padding-bottom : 10;
    margin-bottom : 1px;
    background-color : ${props => props.theme.bgColor};
    flex-direction : row;
    align-items : center;
`
const ChatAvatar = styled.Image`
    width : 50;
    height : 50;
    border-radius : 15;
    margin-right : 18;
`

const ChatInfoMain = styled.View`
    height : 50;
    flex : 1;
    margin-right : 25;
`
const OpponentName = styled.Text`
    font-size : 16;
    margin-bottom : 5;
`

const ChatPreview = styled.Text`
    opacity : 0.5;
    overflow : hidden;
`

const ChatInfoSub = styled.View`
    width : 45;
    height : 50;
`

const ChatTimestamp = styled.Text`
    opacity : 0.3;
    font-size : 11.5;
    position : absolute;
    width : 95;
    top : 2;
    right : 0;
    text-align : right;
`

const ChatUnreadMark = styled.View`
    background-color : ${props => props.theme.pastelBtn};
    width : 12;
    height : 12;
    border-radius : 6;
    position : absolute;
    bottom : 7;
    right : 5;
`

export default ({
    chatsList,
    refetch,
    navigation
}) => {
    const [chats, setChats] = useState(chatsList);
    const sortedChats = [...chats].sort(chatsSortFunc);
    const userObj = getUserObj();
    const [quitChatMutation] = useMutation(QUIT_CHAT);
    const { data : newMessageData } = useSubscription(
        NEW_MESSAGE,
        {
            variables : {id : userObj.id}
        }
    );
    const { data : newChatData } = useSubscription(
        NEW_CHAT,
        {
            variables : {id : userObj.id}
        }
    )
    useEffect(() => {
        if (newMessageData && newMessageData.newMessage){
            const updatedChats = chats.map(chat => {
                if (chat.id === newMessageData.newMessage.chat.id){
                    return ({
                        ...chat,
                        lastMessage : newMessageData.newMessage
                    })
                } else {
                    return chat
                }
            });
            setChats(updatedChats);
        }
    }, [newMessageData]);
    useEffect(() => {
        if (newChatData && newChatData.newChat){
            setChats([...chats, newChatData.newChat])
        }
    }, [newChatData])
    const quitChat = async(chatId, opponentName) => {
        const { data : {quitChat}} = await quitChatMutation({
            variables : {
                id : chatId
            }
        });
        if (quitChat){
            Alert.alert(`${opponentName}님과의 채팅을 종료하였습니다`)
            await refetch();
        } else{
            Alert.alert("오류가 발생했습니다. 나중에 다시 시도해주십시오")
        }
    }
    const confirmQuitChat = (chatId, opponentName) => (
        Alert.alert(
            "해당 채팅을 종료하시겠습니까?",
            "한 번 채팅을 나간 상대와는 다시 매칭될 수 없으며 상대방으로부터 메시지가 더 이상 수신되지 않습니다",
            [
                {
                    text : "확인",
                    onPress : () => {quitChat(chatId, opponentName)}
                },
                {
                    text : "취소",
                    onPress : () => 1
                },
            ],
            {cancelable : false}
        )
    )
    return (
        <ScrollView style={{flex : 1, backgroundColor : styles.bgColor, paddingTop : 5}}>
            <ChatTabsContainer>
                {sortedChats.map((chat) => {
                    const opponent = getOpponent(chat.participants, userObj.id);
                    console.log(chat.lastMessage);
                    return (
                        <ChatTab key={chat.id}
                            onPress={() => navigation.navigate("Chat", {chatId : chat.id, opponentName : opponent.name})}
                            onLongPress={() => {confirmQuitChat(chat.id, opponent.name)}}
                        >
                            <ChatAvatar source={{uri : opponent.avatar}}/>
                            <ChatInfoMain>
                                <OpponentName>{opponent.name}</OpponentName>
                                <ChatPreview numberOfLines={1}>{chat.lastMessage ? chat.lastMessage.text : "매칭이 성사되었습니다 ❤"}</ChatPreview>
                            </ChatInfoMain>
                            <ChatInfoSub>
                                <ChatTimestamp>{getTimeStamp(chat.lastMessage ? chat.lastMessage.createdAt : chat.createdAt)}</ChatTimestamp>
                                {(!chat.lastMessage || (!chat.lastMessage.isChecked && chat.lastMessage.from.id !== userObj.id)) && <ChatUnreadMark />}
                            </ChatInfoSub>
                        </ChatTab>
                    )
                })}
            </ChatTabsContainer>
        </ScrollView>
    )
}