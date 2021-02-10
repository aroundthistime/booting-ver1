import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Alert, Keyboard, Modal, Platform, ScrollView, Text, TouchableOpacity, View} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import constants from "../../constants";
import styles from "../../styles";
import { getUserObj } from "../../UserContext";
import { getOpponent } from "../../utils";
import { REPORT_USER } from "../GlobalQueries";
import { DETECT_MESSAGE_READ, GET_CHAT, NEW_MESSAGE_FROM_CHAT, QUIT_CHAT, READ_MESSAGE, SEND_MESSAGE } from "./ChatQueries";

const FONT_SIZE = 16;
const NUMBER_OF_LINES = 2;
const REPORT_REASONS = ["사진도용","신상정보 거짓기입", "욕설/성희롱/혐오발언","부적절한 용도로 어플사용"];

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

const ModalCloseBtn = styled.TouchableOpacity`
    position : absolute;
    top : 10;
    right : 10;
    width : 25;
    height : 25;
    border-radius : 5;
    background-color : #E0E0E0;
    justify-content : center;
    align-items : center;
`

const ModalTitle = styled.Text`
    font-size : 17.3;
`

const ModalOptions = styled.View`
    flex-direction : row;
    justify-content : space-between;
    width : 240;
    height : 110;
    background-color : #e8e3e3;
`

const ReportModalOptions = styled.View`
    margin-top :10;
    width : 240;
    height : 160;
    background-color : #e8e3e3;
    justify-content : space-between;
    padding-bottom : 1;
`

const ReportModalOption = styled.TouchableOpacity`
    width : 240;
    padding-top : 10;
    padding-bottom :10;
    padding-left : 10;
    background-color : ${props => props.theme.bgColor};
`

const ModalOption = styled.TouchableOpacity`
    align-items : center;
    padding-top : 20;
    justify-content : space-between;
    width : 119.2;
    background-color : ${props => props.theme.bgColor};
`


export default ({navigation, route}) => {
    const [messageValue, setMessageValue] = useState("");
    const scrollViewRef = useRef();
    const [viewScrollBottomBtn, setViewScrollBottomBtn] = useState(false);
    const [sendMessageMutation] = useMutation(SEND_MESSAGE);
    const [messages, setMessages] = useState([]);
    const [opponent, setOpponent] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [reportModalVisible, setReportModalVisible] = useState(false);
    const [readMessageMutation] = useMutation(READ_MESSAGE);
    const [quitChatMutation] = useMutation(QUIT_CHAT);
    const [reportUserMutation] = useMutation(REPORT_USER);
    const userObj = getUserObj();
    const {
        params : {chatId, opponentName}
    } = route;
    navigation.setOptions({title : opponentName});
    const { data : newMessageData, loading} = useSubscription(
        NEW_MESSAGE_FROM_CHAT,
        { variables : {
            id : chatId
        }}
    );
    const {data : messageReadData} = useSubscription(
        DETECT_MESSAGE_READ,
        {
            variables : { chatId }
        }
    );
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
    const {data, error, refetch} = useQuery(GET_CHAT, {
        suspend : true,
        variables : {
            id : chatId
        }
    });
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", scrollToBottom);
        return () => {
            Keyboard.removeListener("keyboardDidShow",scrollToBottom);
        }
    }, []);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async() => {
          await refetch();
        });
        return unsubscribe;
      }, [navigation]);
    useEffect(() => {
        if (newMessageData && newMessageData.newMessageFromChat){
            setMessages([...messages, newMessageData.newMessageFromChat])
        }
    }, [newMessageData]);
    useEffect(() => {
        if (messageReadData && messageReadData.detectMessageRead){
            const readMessage = messageReadData.detectMessageRead.message;
            const updatedMessages = messages.map(message => {
                if (message.id === readMessage.id && message.from.id === userObj.id){
                    return ({
                        ...message,
                        isChecked : true
                    })
                } else {
                    return message
                }
            });
            setMessages(updatedMessages);
        }
    }, [messageReadData]);
    useEffect(() => {
        if (data && data.getChat){
            setMessages(data.getChat.messages);
            setOpponent(getOpponent(data.getChat.participants, userObj.id))
        }
    }, [data]);
    useEffect(() => {
        if (route.params && route.params.showModal){
            setModalVisible(true);
            navigation.setParams({
                ...route.params,
                showModal : false
            })
        }
    }, [route])
    if (messages.length > 0 && messages[messages.length-1].from.id !== userObj.id){
        readMessageMutation({
            variables : {
                messageId : messages[messages.length-1].id
            }
        })
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
        if (messageValue === ""){
            return
        }
        try{
            sendMessageMutation({
                variables : {
                    chatId,
                    opponentId : opponent.id,
                    text : messageValue
                },
            });
            setMessageValue("");
        } catch(error){
            console.log(error);
        }
    }
    const quitChat = async() => {
        const {data : {quitChat : quitChatSuccess}} = await quitChatMutation({
            variables : {
                id : chatId
            }
        });
        if (quitChatSuccess){
            navigation.pop();
        } else{
            Alert.alert("오류가 발생하였습니다. 다시 시도해주시길 바랍니다.")
        }
    }
    const reportUser = async(reason) => {
        try{
            const {data : {reportUser : reportUserSuccess}} = await reportUserMutation({
                variables : {
                    id : opponent.id,
                    chatId,
                    reason
                }
            });
            if (reportUserSuccess){
                Alert.alert("해당 유저에 대한 신고가 완료되었습니다")
                navigation.pop();
            } else {
                Alert.alert("오류가 발생하였습니다. 다시 시도해주시길 바랍니다.")
            }
        } catch{
            quitChat();
        }
    }
    const confirmReportUser = (reason) => (
        Alert.alert(
            `${opponentName}님을 '${reason}'으로 신고하시겠습니까?`,
            "신고시 더 이상 해당 유저로부터 메시지가 수신되지 않으며 채팅목록에서 삭제됩니다. 참고로 무분별한 신고는 정지 사유가 될 수 있으니 주의바랍니다.",
            [
                {
                    text : "확인",
                    onPress : () => {reportUser(reason);}
                },
                {
                    text : "취소",
                    onPress : () => 1
                },
            ],
            {cancelable : false}
        )
    )
    const confirmQuitChat = () => (
        Alert.alert(
            `정말로 ${opponentName}님과의 채팅을 종료하시겠습니까?`,
            "채팅종료시 더 이상 해당 유저로부터 메시지가 수신되지 않으며 채팅목록에서 삭제됩니다.",
            [
                {
                    text : "확인",
                    onPress : () => {quitChat()}
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
                        {messages.map((message, index, array) => {
                            let isChecked = false;
                            let createdAt = "";
                            const fromMe = userObj.id === message.from.id;
                            if (fromMe && index === array.length - 1){
                                isChecked = message.isChecked;
                            }
                            if (index === 0){
                                if (array.length === 1 || !checkSameTime(array[1].createdAt, message.createdAt)){
                                    createdAt = formatToHourMinute(message.createdAt);
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
                                            isChecked={isChecked}
                                        />
                                    </>
                                )
                            } else {
                                let avatar;
                                let isMyFirst = false;
                                if (array[index-1].from.id !== message.from.id){
                                    if (fromMe){
                                        isMyFirst = true;
                                    } else{
                                        avatar = opponent.avatar;
                                    }
                                }
                                if (index === array.length - 1 || !checkSameTime(message.createdAt, array[index+1].createdAt)){
                                    createdAt = formatToHourMinute(message.createdAt);
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
                                                isChecked={isChecked}
                                            />
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            <ChatNotice>{formatToFullDate(message.createdAt)}</ChatNotice>
                                            <Message 
                                                fromMe={fromMe}
                                                avatar={opponent.avatar}
                                                text={message.text}
                                                createdAt={createdAt}
                                                isMyFirst={isMyFirst}
                                                isChecked={isChecked}
                                            />
                                        </>
                                    )
                                }
                            }
                        })}
                        {data.getChat.participants.length < 2 && <ChatNotice style={{marginTop : 30, marginBottom : 20}}>상대방이 대화를 종료하였습니다.</ChatNotice>}
                        {data.getChat.participants.length === 2 && opponent && opponent.isBanned && (
                            <ChatNotice style={{marginTop : 30, marginBottom : 20}}>상대방의 계정이 규정위반으로 정지되었습니다</ChatNotice>
                        )}
                        {data.getChat.participants.length === 2 && opponent && !opponent.isBanned && opponent.isDeactivated && (
                            <ChatNotice style={{marginTop : 30, marginBottom : 20}}>상대방의 계정이 비활성화되었습니다</ChatNotice>
                        )}
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
                        editable={data.getChat.participants.length > 1 && !data.getChat.participants.some(participant => participant.isBanned || participant.isDeactivated)}
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
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={{
                         flex: 1, justifyContent: "center", alignItems: "center"
                    }}>
                        <View style={{
                            shadowColor: "#000",
                            shadowOffset: {
                            width: 0,
                            height: 2
                            },
                            width : 300,
                            height : 250,
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            justifyContent : "space-between",
                            paddingVertical : 45,
                            alignItems : "center",
                            backgroundColor : styles.bgColor,
                        }}>
                            <ModalCloseBtn onPress={()=>setModalVisible(false)}>
                                <Ionicons name="close" size={22} color="#fcfcfc" />
                            </ModalCloseBtn>
                            <ModalTitle>원하는 행동을 선택하세요</ModalTitle>
                            <ModalOptions>
                                <ModalOption onPress={()=>{confirmQuitChat(); setModalVisible(false);}}>
                                    <Ionicons name="exit-outline" size={50} color="#a8a8a8" style={{marginLeft : 10}}/>
                                    <Text>채팅 종료</Text>
                                </ModalOption>
                                <ModalOption onPress={()=>{setModalVisible(false), setReportModalVisible(true)}}>
                                    <Feather name="alert-triangle" size={50} color="#a8a8a8" />
                                    <Text>신고하기</Text>
                                </ModalOption>
                            </ModalOptions>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={reportModalVisible}
                    onRequestClose={() => setReportModalVisible(false)}
                >
                    <View style={{
                         flex: 1, justifyContent: "center", alignItems: "center"
                    }}>
                        <View style={{
                            shadowColor: "#000",
                            shadowOffset: {
                            width: 0,
                            height: 2
                            },
                            width : 300,
                            height : 250,
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            justifyContent : "space-between",
                            paddingVertical : 30,
                            alignItems : "center",
                            backgroundColor : styles.bgColor,
                        }}>
                            <ModalCloseBtn onPress={()=>setReportModalVisible(false)}>
                                <Ionicons name="close" size={22} color="#fcfcfc" />
                            </ModalCloseBtn>
                            <ModalTitle>신고 사유를 선택해주세요</ModalTitle>
                            <ReportModalOptions>
                                {REPORT_REASONS.map(reason => (
                                    <ReportModalOption onPress={()=>{setReportModalVisible(false); confirmReportUser(reason);}}>
                                        <Text>{reason}</Text>
                                    </ReportModalOption>
                                ))}
                            </ReportModalOptions>
                        </View>
                    </View>
                </Modal>
                </>
            ) : (
                <Loader />
            )}
        </Suspense>
)};
