import React from "react";
import styled from "styled-components";

const Container = styled.TouchableOpacity`
  padding-right: 20px;
  padding-top : 5px;
`;

const Text = styled.Text`
    fontSize : 16;
    opacity : 0.5;
    font-weight : bold;
`

export default () => (
    <Container>
        <Text>완료</Text>
    </Container>
)