import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";

const Container = styled.View`
  background-color: ${props => props.theme.pastelBtn}
  padding: 10px;
  margin: 0px 50px;
  margin-top : 15px;
  border-radius: 4px;
  width: ${constants.width / 1.6};
`;

const Text = styled.Text`
  text-align: center;
  font-weight: 600;
`;

const AuthButton = ({ text, onPress, loading=false }) => (
  <TouchableOpacity onPress={onPress} disabled={loading}>
    <Container>
      {loading ? <ActivityIndicator color={"#959595"}></ActivityIndicator> : <Text>{text}</Text>}
    </Container>
  </TouchableOpacity>
);

AuthButton.propTypes = {
  loading : PropTypes.bool,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default AuthButton;