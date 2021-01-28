import React from "react";
import { useMutation, useQuery } from "react-apollo-hooks";
import { Alert, Keyboard, Text, TouchableWithoutFeedback } from "react-native";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../Hooks/useInput";
import { CHANGE_PASSWORD, CREATE_USER } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color : ${props => props.theme.pastelBg};
`;

export default ({ route, navigation }) => {
    const {
        params : {
            email, isSignup
        }
    } = route;
    const password1Input = useInput("");
    const password2Input = useInput("");
    const [loading, setLoading] = useState(false);
    const [changePasswordMutation] = useMutation(CHANGE_PASSWORD, {
        variables : {
            email,
            password : password1Input.value
        },
        update : (_, {data}) => {
            const {changePassword} = data;
            if (changePassword){
                Alert.alert("비밀번호가 변경되었습니다. 다시 로그인해주세요")
                navigation.navigate("Login");
            } else{
                Alert.alert("오류가 발생하였습니다. 다시 시도해주세요")
            }
        }
    })
    const [createUserMutation] = useMutation(CREATE_USER, {
        variables : {
            email,
            password : password1Input.value,
        },
        update : (_, {data}) => {
            const {createUser} = data;
            if (createUser){
                Alert.alert("회원가입이 완료되었습니다. 로그인을 진행해주세요");
                navigation.navigate("Login");
            } else{
                Alert.alert("오류가 발생하였습니다. 다시 시도해주세요")
            }
        }
    });
    const handleSubmit = async() => {
        setLoading(true);
        try{
            if (password1Input.value !== password2Input.value){
                Alert.alert("비밀번호가 서로 일치하지 않습니다")
                throw Error;
            } else if (password1Input.value.length < 10){
                Alert.alert("비밀번호는 최소 길이는 10글자입니다")
                throw Error;
            } else if (password1Input.value.length > 20){
                Alert.alert("비밀번호의 최대 길이는 20자입니다")
                throw Error;
            } else if (password1Input.value.indexOf(" ") > -1){
                Alert.alert("비밀번호에는 공백문자가 들어갈 수 없습니다")
                throw Error;
            }
            if (isSignup){
                await createUserMutation();
            } else{
                await changePasswordMutation();
            }
        } catch(error){
            console.log(error);
        } finally{
            setLoading(false);
        }

    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
            <AuthInput
                {...password1Input}
                placeholder={isSignup ? "비밀번호" :"새 비밀번호"}
                autoCorrect={false}
            />
            <AuthInput
                {...password2Input}
                placeholder={isSignup ? "비밀번호 확인" :"새 비밀번호 확인"}
                secureTextEntry={true}
                autoCorrect={false}
            />
            <AuthButton
                loading={loading}
                onPress={handleSubmit}
                text={isSignup ? "가입하기" : "비밀번호 변경하기"} />
        </View>
      </TouchableWithoutFeedback>
    );
};