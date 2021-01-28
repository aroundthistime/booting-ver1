import React from "react";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../Hooks/useInput";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color : ${props => props.theme.pastelBg};
`;

export default ({ route, navigation }) => {
    const {
        params : {
            email, secret, isSignup
        }
    } = route;
    const secretInput = useInput("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = () => {
        setLoading(true);
        if (parseInt(secretInput.value) === secret){
            navigation.navigate("SetPassword", {email, isSignup });
        } else {
            Alert.alert("인증번호를 다시 확인하십시오")
            secretInput.value = "";
            setLoading(false);
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput
                    {...secretInput}
                    placeholder="인증번호"
                    keyboardType="number-pad"
                    autoCorrect={false}
                />
                <AuthButton loading={loading} onPress={handleSubmit} text="인증번호 확인" />
            </View>
      </TouchableWithoutFeedback>
    )
}