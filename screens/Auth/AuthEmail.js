import React from "react";
import { useQuery } from "@apollo/client";
import { Alert, Keyboard, Text, TouchableWithoutFeedback } from "react-native";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../Hooks/useInput";
import { emailValidator } from "../../utils";
import { CHECK_EMAIL_USING, REQUEST_SECRET } from "./AuthQueries";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color : ${props => props.theme.pastelBg};
`;

export default ({ route, navigation }) => {
    const {
      params : {
        isSignup
      }
    } = route;
    const emailInput = useInput("");
    const [loading, setLoading] = useState(false);
    const {fetchMore : checkEmailUsing} = useQuery(CHECK_EMAIL_USING, {
      variables : {
        email : emailInput.value
      }
    });
    const {fetchMore : requestSecretQuery} = useQuery(REQUEST_SECRET, {
      variables : {
        email : emailInput.value,
        actualSending : false
      }
    })
    const handleEmailSubmit = async() => {
      const {value : email} = emailInput;
      setLoading(true);
      try{
        if (email === "" || !emailValidator(email)){
          throw Error;
        }
        const {data : {checkEmailUsing : emailUsing}} = await checkEmailUsing({
          variables : {
            email
          },
          updateQuery(){
          }
        });
        if (isSignup){ //회원가입
          if (emailUsing){
            Alert.alert("이미 해당 웹메일의 계정이 존재합니다")
            navigation.navigate("Login");
          } else{
            const  {data : { requestSecret : secret }} = await requestSecretQuery({
              variables : {
                email,
                actualSending : true
              },
              updateQuery(){}
            })
            if (secret !== -1){
              Alert.alert("해당 웹메일로 인증번호를 전송하였습니다.");
              navigation.navigate("EmailAuthentication", {email, secret, isSignup})
            } else{
              Alert.alert("오류가 발생하였습니다. 다시 시도하여 주십시오.")
            }
          }
        } else { //비밀번호찾기
          if (emailUsing){
            const  {data : { requestSecret : secret }} = await requestSecretQuery({
              variables : {
                email,
                actualSending : true
              },
              updateQuery(){}
            })
            if (secret !== -1){
              Alert.alert("해당 웹메일로 인증번호를 전송하였습니다.");
              navigation.navigate("EmailAuthentication", {email, secret, isSignup})
            } else{
              Alert.alert("오류가 발생하였습니다. 다시 시도하여 주십시오.")
            }
          } else{
            Alert.alert("해당 웹메일의 계정이 존재하지 않습니다")
          }
        }
      } catch(error){
        console.log(error);
        Alert.alert("웹메일을 제대로 입력해주세요")
      } finally{
        setLoading(false)
      }
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <AuthInput
            {...emailInput}
            placeholder="웹메일"
            keyboardType="email-address"
            autoCorrect={false}
          />
          {/* <AuthInput
            {...nameInput}
            placeholder="이름"
            autoCapitalize="words"
          />
          <AuthInput
            {...passwordInput}
            placeholder="비밀번호"
            secureTextEntry={true}
            autoCorrect={false}
          /> */}
          <AuthButton loading={loading} onPress={handleEmailSubmit} text="인증하기" />
        </View>
      </TouchableWithoutFeedback>
    );
  };