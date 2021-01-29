import React from "react";
import { ActivityIndicator } from "react-native";
import styles from "../styles";
import ViewContainer from "./ViewContainer";

export default () => (
    <ViewContainer>
        <ActivityIndicator color={styles.pastelBg} size="large"/>
    </ViewContainer>
)