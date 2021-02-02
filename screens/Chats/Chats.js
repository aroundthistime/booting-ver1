import React from "react";
import { useQuery } from "react-apollo-hooks";
import { Alert, ScrollView } from "react-native";
import styled from "styled-components";
import Loader from "../../components/Loader";
import styles from "../../styles";
import { GET_CHATS } from "./ChatQueries";


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
`

const ChatUnreadMark = styled.View`
    background-color : red;
    width : 12;
    height : 12;
    border-radius : 6;
    position : absolute;
    bottom : 7;
    right : 15;
`

const AVATAR_URL = "data:image/jpeg;base64,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";

export default ({navigation}) => {
    // const {loading, data} = useQuery(GET_CHATS, {
    //     fetchPolicy : "network-only"
    // });
    // console.log(data);
    return (
        <>
            {!loading && data && data.getChats ? (
                <ScrollView style={{flex : 1, backgroundColor : styles.bgColor, paddingTop : 10, paddingBottom : 10}}>
                    <ChatTabsContainer>
                        {data.getChats.map((chat) => (
                            <ChatTab onPress={() => navigation.navigate("Chat", {chatId : chat.id})} onLongPress={() => Alert.alert("HI")}>
                                <ChatAvatar source={{uri : AVATAR_URL}}/>
                                {/* <Text style={{backgroundColor : "red"}}>Chats</Text> */}
                                <ChatInfoMain>
                                    <OpponentName>이주빈</OpponentName>
                                    <ChatPreview numberOfLines={1}>{chat.lastMessage ? chat.lastMessage.text : "매칭이 성사되었습니다 ❤"}</ChatPreview>
                                </ChatInfoMain>
                                <ChatInfoSub>
                                    <ChatTimestamp>{chat.lastMessage.createdAt ? chat.lastMessage.createdAt : chat.createdAt}</ChatTimestamp>
                                    {!chat.lastMessage.isChecked && <ChatUnreadMark />}
                                </ChatInfoSub>
                            </ChatTab>
                        ))}
                    </ChatTabsContainer>
                </ScrollView>
            ) : (
                <Loader />
            )}
            <ScrollView style={{flex : 1, backgroundColor : styles.bgColor, paddingTop : 10, paddingBottom : 10}}>
                <ChatTabsContainer>
                    <ChatTab onPress={() => navigation.navigate("Chat")} onLongPress={() => Alert.alert("HI")}>
                        <ChatAvatar source={{uri : AVATAR_URL}}/>
                        {/* <Text style={{backgroundColor : "red"}}>Chats</Text> */}
                        <ChatInfoMain>
                            <OpponentName>이주빈</OpponentName>
                            <ChatPreview numberOfLines={1}>1111111111111111111111111111</ChatPreview>
                        </ChatInfoMain>
                        <ChatInfoSub>
                            <ChatTimestamp>11:18</ChatTimestamp>
                            <ChatUnreadMark />
                        </ChatInfoSub>
                    </ChatTab>
                </ChatTabsContainer>
            </ScrollView>
        </>
    )
}