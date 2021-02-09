import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Alert } from "react-native";
import styled from "styled-components";
import { useLogUserOut } from "../../AuthContext";

const FONT_AWESOME_5 = "FontAwesome5";
const FONT_AWESOME = "FontAwesome";
const IONICONS = "Ionicons"

const View = styled.View`
    padding-top : 10;
    padding-bottom : 10;
    background-color : ${props => props.theme.bgColor};
    flex : 1;
`

const SettingsTabsContainer = styled.View`
    background-color : rgba(0, 0, 0, 0.1);
`

const SettingsTabContainer = styled.TouchableOpacity`
    height : 50;
    flex-direction : row;
    align-items : center;
    padding-left : 20;
    padding-right : 20;
    margin-bottom : 1px;
    background-color : ${props => props.theme.bgColor};
`

const SettingsIconContainer = styled.View`
    width : 26;
    margin-right : 17;
    justify-content : center;
    align-items : center;
`

const SettingsIcon = ({family, name, size, color="rgba(0, 0, 0, 0.7)"}) => {
    if (family === FONT_AWESOME_5) {
        return <FontAwesome5 name={name} size={size} color={color} />
    } else if (family === FONT_AWESOME){
        return <FontAwesome name={name} size={size} color={color} />
    } else if (family === IONICONS){
        return <Ionicons name={name} size={size} color={color} />
    }
}

const SettingsTabTitle = styled.Text`
    font-size : 17;
`

const SettingsTab = ({onPress, family, name, title, color, size=24}) => (
    <SettingsTabContainer onPress={onPress} activeOpacity={0.35}>
        <SettingsIconContainer>
            <SettingsIcon family={family} name={name} color={color} size={size}/>
        </SettingsIconContainer>
        <SettingsTabTitle>{title}</SettingsTabTitle>
    </SettingsTabContainer>
)

export default ({navigation}) => {
    const logUserOut = useLogUserOut();
    const confirmLogout = () => (
        Alert.alert(
            "정말 로그아웃하시겠습니까?",
            "",
            [
                {
                    text : "취소",
                    onPress : () => 1,
                    style : "cancel"
                },
                {
                    text : "확인",
                    onPress : logUserOut
                }
            ],
            {cancelable : false}
        )
    )
    return (
        <View>
            <SettingsTabsContainer>
                <SettingsTab
                    onPress={() => navigation.navigate("UserSettings")}
                    family={FONT_AWESOME_5}
                    name="user-circle"
                    title="계정"
                />
                <SettingsTab
                    onPress={() => navigation.navigate("SettingsVersion")}
                    family={IONICONS}
                    name="information-circle-outline"
                    title="버전정보"
                />
                <SettingsTab
                    onPress={()=> navigation.navigate("SettingsGuide")}
                    family={IONICONS}
                    name="md-help-circle-outline"
                    title="도움말"
                />
                <SettingsTab
                    onPress={confirmLogout}
                    family={FONT_AWESOME_5}
                    name="unlock"
                    title="로그아웃"
                    size={20}
                />
            </SettingsTabsContainer>
        </View>
    )
}