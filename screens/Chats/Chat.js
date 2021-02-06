import { useMutation, useQuery } from "@apollo/client";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Alert, Keyboard, Platform, ScrollView, Text, View} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import constants from "../../constants";
import styles from "../../styles";
import { getUserObj } from "../../UserContext";
import { getOpponent } from "../../utils";
import { GET_CHAT, SEND_MESSAGE } from "./ChatQueries";

const FONT_SIZE = 16;

const NUMBER_OF_LINES = 2;

const ChatNotice = styled.Text`
    text-align : center;
    align-self : center;
    padding-left : 10;
    padding-right : 10;
    padding-top : 5;
    padding-bottom : 5;
    border-radius : 10;
    font-size : 13;
    margin-bottom : 5;
    background-color : ${props => props.theme.pastelBtn}
`


const ChatInputContainer = styled.View`
    flex-direction : row;
    width : ${constants.width}
    position : absolute;
    bottom : 0;
    left : 0;
    background-color : ${props => props.theme.bgColor}
    
`

const ChatInput = styled.TextInput`
    padding-top : 5;
    padding-bottom : 5;
    padding-left : 15;
    padding-right : 15;
    flex : 1;
    font-size : ${FONT_SIZE}
`

const ChatSendBtn = styled.TouchableOpacity`
    justify-content : center;
    align-items : center;
    width : 40;
`

const ScrollBottomBtn = styled.TouchableOpacity`
    justify-content : center;
    align-items : center;
    position : absolute;
    bottom : 70;
    right : 20;
    width : 40;
    height : 40;
    border-radius : 20;
    background-color : rgba(0, 0, 0, 0.5);
`

export default ({navigation, route}) => {
    const [messageValue, setMessageValue] = useState("");
    const scrollViewRef = useRef();
    const [viewScrollBottomBtn, setViewScrollBottomBtn] = useState(false);
    const [sendMessageMutation] = useMutation(SEND_MESSAGE);
    const scrollToBottom = () => {
        if (scrollViewRef.current){
            scrollViewRef.current.scrollToEnd();
        }  
    }
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 200;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
    };
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", scrollToBottom);
        return () => {
            Keyboard.removeListener("keyboardDidShow",scrollToBottom);
        }
    }, []);
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
    const formatToHourMinute = (time) => {
        const timeObj = new Date(time);
        const hours = timeObj.getHours();
        let minutes = timeObj.getMinutes();
        if (minutes < 10){
            minutes = `0${minutes}`;
        }
        if (hours < 12){
            if (hours === 0){
                return `오전 12:${minutes}`
            } else{
                return `오전 ${hours}:${minutes}`
            }
        } else {
            if (hours === 12){
                return `오후 12:${minutes}`
            } else {
                return `오후 ${hours - 12}:${minutes}`
            }
        }
    }
    const formatToFullDate = (time) => {
        const date = new Date(time);
        return `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`
    }
    const checkSameDate = (timeStr1, timeStr2) => {
        const time1 = new Date(timeStr1);
        const time2 = new Date(timeStr2);
        return time1.getDate() === time2.getDate();
    }
    const checkSameTime = (timeStr1, timeStr2) => {
        const time1 = new Date(timeStr1);
        const time2 = new Date(timeStr2);
        const sameMinute = time1.getDate() === time2.getDate()
            && (time1.getHours() === time2.getHours())
            && (time1.getMinutes() === time2.getMinutes());
        return sameMinute;
    }
    const sendMessage = async() => {
        console.log(messageValue);
        if (messageValue === ""){
            return
        }
        try{
            const result = await sendMessageMutation({
                variables : {
                    chatId,
                    opponentId : opponent.id,
                    text : messageValue
                },
            });
            setMessageValue("");
            console.log(result);
            Alert.alert("성공적으로 메시지 보냈어용");
        } catch(error){
            console.log(error);
        }
    }
    return (
        <Suspense fallback={<Loader />}>
            {data && data.getChat ? (
                <>
                <KeyboardAwareScrollView
                style={{flex : 1, backgroundColor : styles.pastelBg, paddingBottom : FONT_SIZE * NUMBER_OF_LINES + 30}}
                ref={scrollViewRef}
                // contentContainerStyle={{flexGrow: 1}}
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        setViewScrollBottomBtn(false);
                    } else{
                        setViewScrollBottomBtn(true);
                    }
                  }}
                >
                    <ScrollView 
                        style={{ paddingBottom : FONT_SIZE * NUMBER_OF_LINES + 25, paddingHorizontal : 15, paddingTop : 20}}
                        ref={scrollViewRef}
                        onContentSizeChange={()=>scrollViewRef.current.scrollToEnd()}
                    >
                        <ChatNotice style={{marginBottom : 20}}>
                            <Text style={{fontWeight: "bold"}}>{opponentName}</Text> 님과 매칭되었습니다 ❤{"\n"}대화를 시작해보세요
                        </ChatNotice>
                        {data.getChat.messages.map((message, index, array) => {
                            if (index === 0){
                                const fromMe = userObj.id === message.from.id;
                                let createdAt = "";
                                if (array.length === 1 || !checkSameTime(array[1].createdAt, message.createdAt)){
                                    createdAt = formatToHourMinute(message.createdAt)
                                }
                                return (
                                    <>
                                        <ChatNotice>{formatToFullDate(message.createdAt)}</ChatNotice>
                                        <Message
                                            fromMe={fromMe}
                                            isMyFirst={true}
                                            avatar={fromMe ? undefined : opponent.avatar}
                                            text={message.text}
                                            createdAt={createdAt}
                                        />
                                    </>
                                )
                            } else {
                                const fromMe = userObj.id === message.from.id;
                                let avatar;
                                let createdAt="";
                                let isMyFirst = false;
                                if (array[index-1].from.id !== message.from.id){
                                    if (fromMe){
                                        isMyFirst = true;
                                    } else{
                                        avatar = opponent.avatar;
                                    }
                                }
                                if (index === array.length - 1 || !checkSameTime(message.createdAt, array[index+1].createdAt)){
                                    createdAt = formatToHourMinute(message.createdAt)
                                }
                                if (checkSameDate(message.createdAt, array[index-1].createdAt)){
                                    return (
                                        <>
                                            <Message 
                                                fromMe={fromMe}
                                                avatar={avatar}
                                                text={message.text}
                                                createdAt={createdAt}
                                                isMyFirst={isMyFirst}
                                            />
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            <ChatNotice>{formatToFullDate(message.createdAt)}</ChatNotice>
                                            <Message 
                                                fromMe={fromMe}
                                                avatar={avatar}
                                                text={message.text}
                                                createdAt={createdAt}
                                                isMyFirst={isMyFirst}
                                            />
                                        </>
                                    )
                                }
                            }
                        })}
                    </ScrollView>
                </KeyboardAwareScrollView>
                <ChatInputContainer>
                    <ChatInput
                        value={messageValue}
                        onChangeText={text => setMessageValue(text)}
                        multiline
                        numberOfLines={NUMBER_OF_LINES}
                        placeholder="메시지를 입력하세요"
                        maxHeight={FONT_SIZE * NUMBER_OF_LINES + 30}
                        scrollEnabled
                        // editable={false}
                    />
                    <ChatSendBtn onPress={()=>sendMessage()}>
                        <Ionicons name="paper-plane-sharp" size={24} color="black" />
                    </ChatSendBtn>
                </ChatInputContainer>
                {viewScrollBottomBtn && (
                    <ScrollBottomBtn onPress={scrollToBottom}>
                        <FontAwesome name="angle-down" size={24} color="white" />
                    </ScrollBottomBtn>
                )}
                </>
            ) : (
                <Loader />
            )}
        </Suspense>
)};