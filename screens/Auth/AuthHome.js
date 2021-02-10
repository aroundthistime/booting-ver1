import React from "react";
import { StatusBar, Text } from "react-native";
import styled from "styled-components"
import AuthButton from "../../components/AuthButton";
import AuthOtherOption from "../../components/AuthOtherOption";
import constants from "../../constants";

const View = styled.View`
    justify-content : center;
    align-items : center;
    flex : 1;
    background-color : ${props => props.theme.pastelBg}
`

const Title = styled.Text`
    font-size : 60px;
    color : #FDFFFE;
    font-family : BalsamiqSans;
`

const SubTitle = styled.Text`
    font-size : 15px;
    color : #FDFFFE;
    margin-bottom : ${constants.height / 20};
`

export default ({navigation}) => (
    <View>
        <StatusBar></StatusBar>
        <Title>Booting</Title>
        <SubTitle>Only for hufs</SubTitle>
        <AuthButton onPress={() => navigation.navigate("Login")} text="로그인"/>
        <AuthOtherOption
            onPress={() => navigation.navigate("AuthEmail", {isSignup : true})}
            text="회원가입"
        />
    </View>
)