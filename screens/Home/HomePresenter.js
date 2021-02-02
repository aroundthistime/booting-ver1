import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import constants from "../../constants";
import { Alert, Animated, Text, TouchableOpacity, View } from "react-native";
import { BoxShadow } from "react-native-shadow";
import { useMutation } from "react-apollo-hooks";
import {REPORT_USER} from "../GlobalQueries"
import { CREATE_RESPONSE } from "./HomeQueries";

const RefreshButton = styled.TouchableOpacity`
    align-items : center;
    position : absolute;
    align-self : center;
    bottom : -${constants.height / 4}
`

const NoUser = ({onPress}) => (
    <View>
        <Text style={{textAlign : "center", fontSize : 16}}>
            현재 이상형에 부합하는 유저가 더 이상 존재하지 않습니다 😥{"\n"}이상형 기준을 수정하거나 나중에 다시 시도해주세요
        </Text>
        <RefreshButton onPress={onPress}>
            <FontAwesome5 name="undo-alt" size={50} color="rgba(0, 0, 0, 0.35)" />
        </RefreshButton>
    </View>
)

const UserImagesContainer = styled.View`
    position : relative;
    margin-bottom : 60;
    width : ${constants.width / 1.3};
    height : ${constants.width / 1.3};
`


const UserButtons = styled.View`
    width : ${constants.width / 1.4};
    flex-direction : row;
    justify-content : space-between;
    position : absolute;
    bottom : ${constants.height / 14};
`

const UserButtonContainer = styled.TouchableOpacity`
    width : 60;
    height : 60;
    justify-content : center;
    align-items : center;
    background-color : #fcfcfc;
    border-radius : 30;
    box-shadow: 10px 5px 5px black;
    border : 1.5px solid rgba(0, 0, 0, 0.025);
`

const UserButtonLike = ({onPress}) => (
    <UserButtonContainer onPress={onPress}>
        <FontAwesome name="heart" size={24} color="red" />
    </UserButtonContainer>
)

const UserButtonDislike = ({onPress}) => (
    <UserButtonContainer onPress={onPress}>
        <FontAwesome5 name="times" size={24} color="#42a0f7" />
    </UserButtonContainer>
)

const UserButtonReport = ({onPress}) => (
    <TouchableOpacity style={{
        position : "absolute",
        top : constants.height / 10,
        right : 23,
        flexDirection : "row",
        alignItems : "center",
        borderWidth : 1.5,
        borderColor : "rgba(0, 0, 0, 0.025)",
        paddingTop : 5,
        paddingBottom : 5,
        paddingLeft : 12,
        paddingRight : 12,
        borderRadius : 30

    }} onPress={onPress}
    >
        <Feather name="alert-triangle" size={18} color="red" />
        <Text style={{fontSize : 17, marginLeft : 2.5}}>신고</Text>
    </TouchableOpacity>
)

const shadowOpt = {
    width: constants.width / 1.3,
    height:constants.width / 1.3,
    color:"#000",
    border:10,
    radius:3,
    opacity:0.1,
    x:5,
    y:5,
    style:{marginVertical:5}
}

export default ({
    users,
    refetch
}) => {
    const [current, setCurrent] = useState(users.length - 1);
    const [reportUserMutation] = useMutation(REPORT_USER);
    const [createResponseMutation] = useMutation(CREATE_RESPONSE);
    let isSliding = false;
    const createSlideAnimList = () => {
        const list = [];
        for(let i = 0; i < users.length; i++){
            list.push(useRef(new Animated.Value(0)).current);
        }
        return list;
    }
    const slideAnimList = createSlideAnimList();
    const likeUser = () => {
        if (!isSliding){
            isSliding = true;
            Animated.timing(slideAnimList[current], {
                toValue : -constants.width,
                duration : 1000
            }).start();
            setTimeout(() => {
                getNextUser();
            }, 1000);
            createResponseMutation({
                variables : {
                    id : users[current].id,
                    isLike : true
                }
            })
        }
    }
    const dislikeUser = () => {
        if (!isSliding){
            isSliding = true;
            Animated.timing(slideAnimList[current], {
                toValue : constants.width,
                duration : 1000
            }).start();
            setTimeout(() => {
                getNextUser();
            }, 1000);
            createResponseMutation({
                variables : {
                    id : users[current].id,
                    isLike : false
                }
            })
        }
    }
    const getMoreUsers = async() => {
        await refetch();
    }
    const getNextUser = () => {
        if (current <= 0){
            getMoreUsers();
        } else{
            setCurrent(current-1);
        }
    }
    const reportUser = (reason) => {
        reportUserMutation({
            variables : {
                id : users[current].id,
                reason
            }
        });
        Alert.alert("해당 유저가 신고완료되었습니다");
        dislikeUser();
    }
    const confirmReportUser = () => (
        Alert.alert(
            "해당 유저를 신고하시겠습니까?",
            "",
            [
                {
                    text : "확인",
                    onPress : () => {reportUser("사진 도용")}
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
        <>
            {users.length > 0 && (
                <>
                    <UserButtonReport onPress={confirmReportUser}/>
                    <BoxShadow setting={shadowOpt}>
                        <UserImagesContainer>
                            {users.map((user, index) => {
                                if (current >= index){
                                    return <Animated.Image
                                        key={user.avatar}
                                        source={{uri : user.avatar}}
                                        style={[
                                            {
                                                width : constants.width / 1.3,
                                                height : constants.width / 1.3,
                                                borderRadius : 15,
                                                position : "absolute",
                                                top : 0,
                                            },
                                            {left : slideAnimList[index]}
                                        ]}
                                    />
                                } else{
                                    return <View key={index}></View>
                                }
                            })}
                        </UserImagesContainer>
                    </BoxShadow>
                    <UserButtons>
                        <UserButtonLike onPress={likeUser}/>
                        <UserButtonDislike onPress={dislikeUser}/>
                    </UserButtons>
                </>
            )}
            {users.length === 0 && (
                <NoUser onPress={getMoreUsers} />
            )}
        </>
    )
}
//befire 허ㅏㅂ치기