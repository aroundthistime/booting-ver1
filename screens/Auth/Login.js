import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Alert, Keyboard,TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";
import { useLogUserIn } from "../../AuthContext";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import AuthOtherOption from "../../components/AuthOtherOption";
import useInput from "../../Hooks/useInput";
import { emailValidator } from "../../utils";
import { LOG_IN } from "./AuthQueries";

const View = styled.View`
    justify-content : center;
    align-items : center;
    flex : 1;
    background-color : ${props => props.theme.pastelBg};
`

export default ({navigation}) => {
    const emailInput = useInput("");
    const passwordInput = useInput("");
    const [loading, setLoading] = useState(false);
    const logUserIn = useLogUserIn();
    const {fetchMore} = useQuery(LOG_IN, {
        variables : {
            email : emailInput.value,
            password : passwordInput.value
        }
    })
    const handleLogin = async() => {
        const {value : email} = emailInput;
        const {value : password} = passwordInput;
        if (emailValidator(email) && password !== ""){
            setLoading(true);
            try{
                const {data : {login : token}} = await fetchMore({
                    variables : {
                        email : emailInput.value,
                        password : passwordInput.value
                    },
                    updateQuery(){

                    }
                });
                if (token){
                    logUserIn(token);
                } else{
                    throw Error;
                }
            }catch{
                Alert.alert("웹메일 혹은 비밀번호를 확인해주세요")
            } finally{
                setLoading(false);
            }
        } else if (!emailValidator(email)) {
            Alert.alert("웹메일을 제대로 입력해주세요")
        } else{
            Alert.alert("비밀번호를 입력해주세요")
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput {...emailInput} 
                    placeholder="웹메일"
                    keyboardType="email-address"
                    autoCorrect={false}
                />
                <AuthInput {...passwordInput}
                    placeholder="비밀번호"
                    keyboardType="default"
                    secureTextEntry={true}
                    autoCorrect={false}
                />
                <AuthButton onPress={handleLogin} text="로그인" loading={loading}/>
                <AuthOtherOption
                    onPress={() => navigation.navigate("AuthEmail", {isSignup : false})}
                    text="비밀번호 찾기"
                />
            </View>
        </TouchableWithoutFeedback>
    )
}