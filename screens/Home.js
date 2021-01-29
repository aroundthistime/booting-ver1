import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import Loader from "../components/Loader";
import ViewContainer from "../components/ViewContainer";


export default () => (
    <ViewContainer>
        {/* <Text>Home</Text>*/}
        <Loader></Loader>
    </ViewContainer>
)