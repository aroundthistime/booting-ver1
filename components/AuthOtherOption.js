import React from "react";
import PropTypes from "prop-types"
import styled from "styled-components"
import { TouchableOpacity } from "react-native-gesture-handler";

const AuthOptionContainer = styled.View`
    padding-bottom : 1px;
    border-bottom-width : 1px;
    border-bottom-color :  ${props => props.theme.pastelBtn};
`

const AuthOptionText = styled.Text`
    color : ${props => props.theme.pastelBtn};
    font-weight : 600;
    margin-top : 15px;
`

const AuthOtherOption = ({onPress, text}) => (
    <TouchableOpacity onPress={onPress}>
        <AuthOptionContainer>
            <AuthOptionText>{text}</AuthOptionText>
        </AuthOptionContainer>
    </TouchableOpacity>
)

AuthOtherOption.propTypes = {
    onPress : PropTypes.func,
    text : PropTypes.string.isRequired
}

export default AuthOtherOption;