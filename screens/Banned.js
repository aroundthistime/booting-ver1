import React from "react";
import { BackHandler, Text } from "react-native";
import styled from "styled-components";

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
    padding-left : 20;
    padding-right : 20;
`

const MessageTitle = styled.Text`
    font-size : 23;
    color : ${props => props.theme.orangeColor};
    margin-bottom : 25;
`

const MessageMain = styled.Text`
    opacity : 0.6;
    font-size : 16;
    margin-bottom : 25;
`

const ExitBtn = styled.TouchableOpacity`
    justify-content : center;
    align-items : center;
    width : 200;
    height : 35;
    background-color : ${props => props.theme.orangeColor};
    border-radius : 2;
`

export default () => (
    <View>
        <MessageContainer style={{
            shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }}>
            <MessageTitle>이용 제한 안내</MessageTitle>
            <MessageMain>고객님의 계정은 이용규정 위반에 따라 정지되었음을 안내드립니다.{"\n\n"}해당 조치가 잘못되었다고 판단되는 경우 dongdhy@hufs.ac.kr로 문의주시길 바랍니다.</MessageMain>
            <ExitBtn onPress={()=>BackHandler.exitApp()}>
                <Text style={{color : "#fcfcfc", fontWeight : "bold"}}>확인</Text>
            </ExitBtn>
        </MessageContainer>
    </View>
)
