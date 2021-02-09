import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import styled from "styled-components";
import Loader from "../components/Loader";
import styles from "../styles";
import { getRefreshUser } from "../UserContext";
import {GET_USER_AVATAR, ACTIVATE_USER} from "./GlobalQueries";

const View = styled.View`
    justify-content : center;
    align-items : center;
    flex : 1;
    background-color : ${props => props.theme.pastelBg}
`

const MessageContainer = styled.View`
    width : 300;
    height : 270;
    background-color : white;
    align-items : center;
    padding-top : 20;
    padding-bottom : 20;
    padding-left : 20;
    padding-right : 20;
`

const UserAvatar = styled.Image`
    width : 100;
    height : 100;
    border-radius : 50;
    margin-bottom : 10;
`

const UserNameText = styled.Text`
    font-size : 18;
    margin-bottom : 10
`

const GuideText = styled.Text`
    opacity : 0.8;
    text-align : center;
    margin-bottom : 20;
`

const ActivateBtn = styled.TouchableOpacity`
    background-color : ${props => props.theme.orangeColor};
    width : 200;
    height : 35;
    justify-content : center;
    align-items : center;
`

const MessageContainerSmall = styled.View`
    width : 300;
    height : 180;
    background-color : white;
    padding-top : 30;
    padding-bottom : 30;
    padding-left : 20;
    padding-right : 20;
    justify-content : center;
    align-items : center;
`

const ResultTitle = styled.Text`
    font-size : 20;
    padding-bottom : 10;
    margin-bottom : 20;
    border-bottom-width : 1;
    border-bottom-color : rgba(0, 0, 0, 0.1);
    width : 260;
    text-align : center;
`

const ResultMessage = styled.Text`
    padding-bottom : 20;
    font-size : 16;
`

export default () => {
    const [progress, setProgress] = useState();
    const [activateUserMutation] = useMutation(ACTIVATE_USER);
    const {loading, data} = useQuery(GET_USER_AVATAR);
    const activateUser = async() => {
        setProgress("activating");
        const { data : {activateUser}} = await activateUserMutation();
        setProgress(activateUser);
    }
    const refreshUser = getRefreshUser();
    if (progress === undefined){
        return (
            <>
            {!loading && data && data.getNameAvatar ? (
                <View>
                    <MessageContainer
                        style={{
                            shadowColor: "#000",
                            shadowOffset: {
                            width: 0,
                            height: 2
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                        }}>
                        <UserAvatar source={{uri : data.getNameAvatar.avatar}} />
                        <UserNameText>{data.getNameAvatar.name}</UserNameText>
                        <GuideText>현재 계정이 비활성된 상태입니다.{"\n"}계정을 활성화하시겠습니까?</GuideText>
                        <ActivateBtn onPress={activateUser}>
                            <Text style={{color : "#fcfcfc", fontWeight : "bold"}}>활성화</Text>
                        </ActivateBtn>
                    </MessageContainer>
                </View>
            ) : (
                <Loader />
            )}
            </>
        )
    } else {
        return (
            <View>
                <MessageContainerSmall
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                        width: 0,
                        height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    {progress === "activating" && (
                        <ActivityIndicator color={styles.pastelBg} size="large"/>
                    )}
                    {progress === true && (
                        <>
                        <ResultTitle>계정 활성화됨</ResultTitle>
                        {/* <ResultMessage>계정을 활성화하는데 성공하였습니다{"\n"}어플을 종료 후 다시 실행해 주세요</ResultMessage> */}
                        <ResultMessage>계정을 활성화하는데 성공하였습니다</ResultMessage>
                        <ActivateBtn onPress={refreshUser} style={{marginTop : 10}}>
                            <Text style={{color : "#fcfcfc", fontWeight : "bold"}}>확인</Text>
                        </ActivateBtn>
                        </>
                    )}
                    {progress === false && (
                        <>
                        <ResultTitle>오류</ResultTitle>
                        {/* <ResultMessage>계정을 활성화하는데 실패하였습니다{"\n"}나중에 다시 시도해주세요</ResultMessage> */}
                        <ResultMessage>계정을 활성화하는데 실패하였습니다{"\n"}나중에 다시 시도해주세요</ResultMessage>
                        <ActivateBtn onPress={refreshUser} >
                            <Text style={{color : "#fcfcfc", fontWeight : "bold"}}>확인</Text>
                        </ActivateBtn>
                        </>
                    )}
                </MessageContainerSmall>
            </View>
        )
    }
}