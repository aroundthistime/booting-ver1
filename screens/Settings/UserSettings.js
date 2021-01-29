import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { Alert, ScrollView, StyleSheet} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import styled from "styled-components";
import Loader from "../../components/Loader";
import NumberInput from "../../components/NumberInput";
import ViewContainer from "../../components/ViewContainer";
import constants from "../../constants";
import useInput from "../../Hooks/useInput";
import useNumInput from "../../Hooks/useNumInput";
import { GET_ME } from "./SettingsQueries";

const GENDER_LIST = ["남", "여"];
const BOOL_LIST = ["예", "아니오"];
const DEPARTMENT_LIST = ["ELLT", "영미문학·문화학과", "EICC학과", "영어학부", "프랑스어학부", "독일어과", "노어과", "스페인어과", "이탈리아어과", "포르투갈어과", "네덜란드어과", "스칸디나비아어과", "말레이·인도네시아어과", "아랍어과", "태국어과", "베트남어과", "인도어과", "터키·아제르바이잔어과", "이란어과", "몽골어과", "중국언어문화학부", "중국외교통상학부", "일본언어문화학부", "융합일본지역학부", "정치외교학과", "행정학과", "미디어커뮤니케이션 학부", "국제통상학과", "경제학부", "영어교육과", "프랑스어교육과", "독일어교육과", "한국어교육과", "중국어교육과", "교육학전공", "체육학전공", "LD전공", "사회과학전공", "LT학부", "외국어로서의 한국어교육 전공", "외국어로서의 한국어통번역 전공"];
const MBTI_LIST = ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"];
const DRINK_DICTIONARY = {
    "전혀" : "NEVER",
    "가끔" : "SOMETIMES",
    "애주가" : "OFTEN"
}
const DATE_DICTIONARY = {
    "집순이" : "HOME",
    "영화" : "MOVIE",
    "스포츠" : "SPORTS",
    "게임" : "GAMES",
    "여행" : "TRAVEL",
    "맛집" : "EATING",
    "요리" : "COOKING",
    "음주" : "DRINKING"
};
const OPPONENT_SMOKING = ["흡연", "비흡연", "무관"];
const OPPONENT_MILITARY = ["미필", "군필", "무관"];


const ProfileImg = styled.Image`
    width : 120;
    height : 120;
    borderRadius : 60;
    border : 1px solid #e0e1e2;
`

const ProfileImgContainer = styled.View`
    position : relative;
    margin-top : 20;
    margin-bottom : 15;
`

const ProfileImgEditBtn = styled.View`
    border : 1px solid #e0e1e2;
    backgroundColor : #FAFAFA;
    width : 30;
    height : 30;
    borderRadius : 15;
    justify-content : center;
    align-items : center;
    box-shadow: 10px 5px 5px black;
    position : absolute;
    bottom : 0;
    right : 0;
`

const ProfileNameContainer = styled.View`
    borderBottomWidth : 1px;
    borderBottomColor : rgba(0, 0, 0, 0.6);
    margin-bottom : 30;
`

const ProfileNameText = styled.TextInput`
    width: 155;
    padding-right : 10px;
    padding-left : 10px;
    fontSize : 16;
    textAlign : center;
`;

const ProfileName = ({value, onChange}) => (
    <ProfileNameContainer>
        <ProfileNameText 
            onChangeText={onChange}
            placeholder="이름"
            value={value}
        />
    </ProfileNameContainer>
)

const ProfileInfos = styled.View``;

const ProfileInfo = styled.View`
    width : ${constants.width}
    padding-left : 20;
    padding-right : 50;
    flex-direction : row;
`;

const ProfileInfoTitleGrid = styled.Text`
    color : rgba(0, 0, 0, 0.6);
    fontSize : 18;
    padding-top : 15;
    margin-right : 10;
`

const ProfileInfoTitlePicker = styled.Text`
    color : rgba(0, 0, 0, 0.6);
    fontSize : 18;
    padding-top : 10;
    margin-right : 15;
`

const ProfileInfoTitle = styled.Text`
    color : rgba(0, 0, 0, 0.6);
    fontSize : 18;
    padding-top : 7.5;
    margin-right : 15;
`

const ProfileInfoOptionBtns = styled.View`
    flex-direction : row;
`

const ProfileInfoOptionBtnContainer = styled.TouchableOpacity`
    border : 1.3px solid rgba(0, 0, 0, 0.15);
    justify-content : center;
    align-items : center;
    width : 50;
    height : 35;
`

const ProfileInfoOptionBtnSelected = styled.TouchableOpacity`
    border : 1.3px solid rgba(0, 0, 0, 0.15);
    justify-content : center;
    align-items : center;
    width : 50;
    height : 35;
    border : 1.2px solid ${props => props.theme.pastelBg};
    color : red;
`

const ProfileInfoOptionBtnText = styled.Text`
    color : rgba(0, 0, 0, 0.3);
`

const ProfileInfoOptionBtnTextSelected = styled.Text`
color : ${props => props.theme.pastelBg};
`
const PickerContainer = styled.View`
    width : 260;
    border : 1.3px solid rgba(0, 0, 0, 0.15);
    border-radius : 4px;
    height : 45;
    margin-bottom : 10;
`

const ProfileInfoOptionBtn = ({text, onPress, selected}) => {
    if (selected){
        return (
            <ProfileInfoOptionBtnSelected onPress={onPress} activeOpacity={1}>
                <ProfileInfoOptionBtnTextSelected>{text}</ProfileInfoOptionBtnTextSelected>
            </ProfileInfoOptionBtnSelected>
        )
    } else{
        return (
            <ProfileInfoOptionBtnContainer onPress={onPress} activeOpacity={1}>
                <ProfileInfoOptionBtnText>{text}</ProfileInfoOptionBtnText>
            </ProfileInfoOptionBtnContainer>
        )
    }
} 

const TextAmongInput = styled.Text`
    padding-top : 10;
    margin-left : 5;
    margin-right : 5;
    color : rgba(0, 0, 0, 0.4);
`

const DEFAULT_IMG = "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"

const DEFAULT_USER = {
    name : null,
    avatar : null,
    gender : null,
    birthYear : null,
    department : null,
    height : null,
    mbti : null,
    isSmoker : null,
    drink : null,
    finishedMilitary : null,
    datingType : [],
    avoidSameDepartment : null,
    opponentAgeTop : null,
    opponentAgeBottom : null,
    opponentHeightTop : null,
    opponentHeightBottom : null,
    opponentMbti : [],
    opponentIsSmoker : null,
    opponentDrink : [],
    opponentFinishedMilitary : null
}

export default () => {
    const [loading, setLoading] = useState(false);
    const {loading : queryLoading, data} = useQuery(GET_ME);
    const [userInfo, setUserInfo] = useState(data && data.getMe ? data.getMe : DEFAULT_USER);
    const nameInput = useInput(userInfo.name !== null ? userInfo.name : "");
    const birthYearInput = useNumInput(userInfo.birthYear !== null ? userInfo.birthYear : "");
    const heightInput = useNumInput(userInfo.height ? userInfo.height : "");
    const opponentAgeBottomInput = useInput(userInfo.opponentAgeTop ? userInfo.opponentAgeTop : "");
    const opponentAgeTopInput = useInput(userInfo.opponentAgeBottom ? userInfo.opponentAgeBottom : "");
    const opponentHeightBottomInput = useInput(userInfo.opponentHeightBottom ? userInfo.opponentHeightBottom : "");
    const opponentHeightTopInput = useInput(userInfo.opponentHeightTop ? userInfo.opponentHeightTop : "");
    const [thumbnail, setThumbnail] = useState(userInfo.avatar ? userInfo.avatar : DEFAULT_IMG)
    const handleGenderPress = (gender) => {
        if (gender === "남"){
            setUserInfo({
                ...userInfo,
                gender,
                opponentFinishedMilitary : true
            })
        } else{
            setUserInfo({
                ...userInfo,
                gender,
                finishedMilitary : true
            })
        }
    }
    const selectDepartment = (itemValue) => {
        setUserInfo({
            ...userInfo,
            department : itemValue
        })
    }
    const selectMbti = (itemValue) => {
        setUserInfo({
            ...userInfo,
            mbti : itemValue
        });
    }
    const handleSameDept = (value) => {
        if (value === "예"){
            setUserInfo({
                ...userInfo,
                avoidSameDepartment : false
            })
        } else{
            setUserInfo({
                ...userInfo,
                avoidSameDepartment : true
            })
        }
    }
    const handleIsSmokerPress = (value) => {
        if (value === "예"){
            setUserInfo({
                ...userInfo,
                isSmoker : true
            })
        } else{
            setUserInfo({
                ...userInfo,
                isSmoker : false
            })
        }
    }
    const handleDrinkPress = (value) => {
        setUserInfo({
            ...userInfo,
            drink : DRINK_DICTIONARY[value]
        })
    }
    const handleMilitaryPress = (value) => {
        if (value === "예"){
            setUserInfo({
                ...userInfo,
                finishedMilitary : true
            })
        } else{
            setUserInfo({
                ...userInfo,
                finishedMilitary : false
            })
        }
    }
    const handleDatingPress = (value) => {
        const newDatingType = userInfo.datingType;
        const dating = DATE_DICTIONARY[value]
        if (userInfo.datingType.indexOf(dating) > -1){
            newDatingType.splice(newDatingType.indexOf(dating), 1);
        } else{
            newDatingType.push(dating);
        }
        setUserInfo({
            ...userInfo,
            datingType : newDatingType
        })
    }
    const handleOpponentMbtiPress = (mbti) => {
        const opponentMbtiCopy = userInfo.opponentMbti;
        if (userInfo.opponentMbti.indexOf(mbti) > -1){
            opponentMbtiCopy.splice(opponentMbtiCopy.indexOf(mbti), 1);
        } else{
            opponentMbtiCopy.push(mbti);
        }
        setUserInfo({
            ...userInfo,
            opponentMbti : opponentMbtiCopy
        })
    }
    const handleOpponentDrinkPress = (value) => {
        const opponentDrinkCopy = userInfo.opponentDrink;
        const drink = DRINK_DICTIONARY[value];
        if (userInfo.opponentDrink.indexOf(drink) > -1){
            opponentDrinkCopy.splice(opponentDrinkCopy.indexOf(drink), 1);
        } else{
            opponentDrinkCopy.push(drink);
        }
        setUserInfo({
            ...userInfo,
            opponentDrink : opponentDrinkCopy
        })
    }
    const handleOpponentSmokingPress = (value) => {
        let opponentIsSmoker;
        if (value === "흡연"){
            opponentIsSmoker = true;
        } else if (value === "비흡연"){
            opponentIsSmoker = false;
        } else{
            opponentIsSmoker = null;
        }
        setUserInfo({
            ...userInfo,
            opponentIsSmoker
        })
    }
    const handleOpponentMilitaryPress = (value) => {
        let opponentFinishedMilitary;
        if (value === "군필"){
            opponentFinishedMilitary = true;
        } else if (value === "미필"){
            opponentFinishedMilitary = false;
        } else{
            opponentFinishedMilitary = null;
        }
        setUserInfo({
            ...userInfo,
            opponentFinishedMilitary
        })
    }
    return (
        <>
            {queryLoading && (
                <Loader></Loader>
            )}
            {!queryLoading && (
                <ScrollView>
                    <ViewContainer>
                        <ProfileImgContainer>
                            <ProfileImg source={{uri : DEFAULT_IMG}}></ProfileImg>
                            <ProfileImgEditBtn>
                                <FontAwesome5 name="pencil-alt" size={15} color="black" />
                            </ProfileImgEditBtn>
                        </ProfileImgContainer>
                        <ProfileName {...nameInput} />
                        <ProfileInfos>
                            <ProfileInfo>
                                <ProfileInfoTitleGrid>성별</ProfileInfoTitleGrid>
                                <FlatGrid
                                    itemDimension={45}
                                    data={GENDER_LIST}
                                    renderItem={({item})  => (
                                        <ProfileInfoOptionBtn
                                            text={item}
                                            selected={item === userInfo.gender}
                                            onPress={() => {
                                                handleGenderPress(item);
                                            }}
                                        />
                                    )}
                                >
                                </FlatGrid>
                            </ProfileInfo>
                            <ProfileInfo>
                                <ProfileInfoTitle>출생 연도</ProfileInfoTitle>
                                <NumberInput {...birthYearInput} placeholder="ex)2021" />
                            </ProfileInfo>
                            <ProfileInfo>
                                <ProfileInfoTitle>키</ProfileInfoTitle>
                                <NumberInput {...heightInput} placeholder="cm" />
                            </ProfileInfo>
                            <ProfileInfo>
                                <ProfileInfoTitlePicker>학과</ProfileInfoTitlePicker>
                                <PickerContainer>
                                    <Picker
                                        selectedValue={userInfo.department ? userInfo.department : "ELLT"}
                                        onValueChange={selectDepartment}
                                        style={styles.picker}
                                    >
                                        {DEPARTMENT_LIST.map((department, index) => {
                                            return <Picker.Item
                                                key={index}
                                                label={department}
                                                value={department}
                                            />}
                                        )}
                                    </Picker>
                                </PickerContainer>
                            </ProfileInfo>
                            <ProfileInfo>
                                <ProfileInfoTitleGrid>동일학과 포함</ProfileInfoTitleGrid>
                                <FlatGrid
                                    itemDimension={45}
                                    data={BOOL_LIST}
                                    renderItem={({item})  => (
                                        <ProfileInfoOptionBtn
                                            text={item}
                                            selected={userInfo.avoidSameDepartment !== null
                                            && (
                                                (userInfo.avoidSameDepartment && item ==="아니오")
                                                || (!userInfo.avoidSameDepartment && item === "예")
                                            )}
                                            onPress={() => {
                                                handleSameDept(item);
                                            }}
                                        />
                                    )}
                                />
                            </ProfileInfo>
                            <ProfileInfo>
                                <ProfileInfoTitlePicker>MBTI</ProfileInfoTitlePicker>
                                <PickerContainer>
                                    <Picker
                                            selectedValue={userInfo.mbti ? userInfo.mbti : "ISTJ"}
                                            onValueChange={selectMbti}
                                            style={styles.picker}
                                        >
                                            {MBTI_LIST.map((mbti, index) => {
                                                return <Picker.Item
                                                    key={index}
                                                    label={mbti}
                                                    value={mbti}
                                                />}
                                            )}
                                        </Picker>
                                </PickerContainer>
                            </ProfileInfo>
                            <ProfileInfo>
                                <ProfileInfoTitleGrid>흡연 여부</ProfileInfoTitleGrid>
                                <FlatGrid
                                    itemDimension={45}
                                    data={BOOL_LIST}
                                    renderItem={({item})  => (
                                        <ProfileInfoOptionBtn
                                            text={item}
                                            selected={userInfo.isSmoker !== null
                                            && (
                                                (userInfo.isSmoker && item ==="예")
                                                || (!userInfo.isSmoker && item === "아니오")
                                            )}
                                            onPress={() => {
                                                handleIsSmokerPress(item);
                                            }}
                                        />
                                    )}
                                />
                            </ProfileInfo>
                            <ProfileInfo>
                                <ProfileInfoTitleGrid>음주 여부</ProfileInfoTitleGrid>
                                <FlatGrid
                                    itemDimension={45}
                                    data={Object.keys(DRINK_DICTIONARY)}
                                    renderItem={({item})  => (
                                        <ProfileInfoOptionBtn
                                            text={item}
                                            selected={userInfo.drink === DRINK_DICTIONARY[item]}
                                            onPress={() => {
                                                handleDrinkPress(item);
                                            }}
                                        />
                                    )}
                                />
                            </ProfileInfo>
                                {userInfo.gender === "남" && (
                                    <ProfileInfo>
                                        <ProfileInfoTitleGrid>군필 여부</ProfileInfoTitleGrid>
                                        <FlatGrid
                                            itemDimension={45}
                                            data={BOOL_LIST}
                                            renderItem={({item})  => (
                                                <ProfileInfoOptionBtn
                                                    text={item}
                                                    selected={userInfo.finishedMilitary !== null
                                                    && (
                                                        (userInfo.finishedMilitary && item ==="예")
                                                        || (!userInfo.finishedMilitary && item === "아니오")
                                                    )}
                                                    onPress={() => {
                                                        handleMilitaryPress(item);
                                                    }}
                                                />
                                            )}
                                        />
                                    </ProfileInfo>
                            )}
                            <ProfileInfo>
                                <ProfileInfoTitleGrid>데이트 취향{"\n"}(최소 하나)</ProfileInfoTitleGrid>
                                <FlatGrid
                                        itemDimension={45}
                                        data={Object.keys(DATE_DICTIONARY)}
                                        renderItem={({item})  => (
                                            <ProfileInfoOptionBtn
                                                text={item}
                                                selected={userInfo.datingType.indexOf(DATE_DICTIONARY[item]) > -1}
                                                onPress={() => {
                                                    handleDatingPress(item);
                                                }}
                                            />
                                        )}
                                    />
                            </ProfileInfo>
                            <ProfileInfo>
                                <ProfileInfoTitle>이상형 키</ProfileInfoTitle>
                                <NumberInput {...opponentHeightBottomInput} placeholder="최소 키" />
                                <TextAmongInput> ~ </TextAmongInput>
                                <NumberInput {...opponentHeightTopInput} placeholder="최대 키" />
                            </ProfileInfo>
                            <ProfileInfo>
                                <ProfileInfoTitle>이상형 나이</ProfileInfoTitle>
                                <NumberInput {...opponentAgeBottomInput} placeholder="최소"  isSmall={true}/>
                                <TextAmongInput>살 연하 ~ </TextAmongInput>
                                <NumberInput {...opponentAgeTopInput} placeholder="최대" isSmall={true}/>
                                <TextAmongInput>살 연상</TextAmongInput>
                            </ProfileInfo>
                            <ProfileInfo>
                                <ProfileInfoTitleGrid>이상형 MBTI{"\n"}(최소 하나)</ProfileInfoTitleGrid>
                                <FlatGrid
                                    itemDimension={45}
                                    data={MBTI_LIST}
                                    renderItem={({item})  => (
                                        <ProfileInfoOptionBtn
                                            text={item}
                                            selected={userInfo.opponentMbti.indexOf(item) > -1}
                                            onPress={() => {
                                                handleOpponentMbtiPress(item);
                                            }}
                                        />
                                    )}
                                />
                            </ProfileInfo>
                            <ProfileInfo>
                                <ProfileInfoTitleGrid>이상형 음주</ProfileInfoTitleGrid>
                                <FlatGrid
                                    itemDimension={45}
                                    data={Object.keys(DRINK_DICTIONARY)}
                                    renderItem={({item})  => (
                                        <ProfileInfoOptionBtn
                                            text={item}
                                            selected={userInfo.opponentDrink.indexOf(DRINK_DICTIONARY[item]) > -1}
                                            onPress={() => {
                                                handleOpponentDrinkPress(item);
                                            }}
                                        />
                                    )}
                                />
                            </ProfileInfo>
                            <ProfileInfo>
                                <ProfileInfoTitleGrid>이상형 흡연</ProfileInfoTitleGrid>
                                <FlatGrid
                                    itemDimension={45}
                                    data={OPPONENT_SMOKING}
                                    renderItem={({item})  => (
                                        <ProfileInfoOptionBtn
                                            text={item}
                                            selected={(userInfo.opponentIsSmoker === null && item === "무관")
                                                || (userInfo.opponentIsSmoker && item === "흡연")
                                                || (userInfo.opponentIsSmoker === false && item === "비흡연")
                                            }
                                            onPress={() => {
                                                handleOpponentSmokingPress(item);
                                            }}
                                        />
                                    )}
                                />
                            </ProfileInfo>
                            {userInfo.gender === "여" && (
                                <ProfileInfo>
                                    <ProfileInfoTitleGrid>이상형 군대</ProfileInfoTitleGrid>
                                    <FlatGrid
                                        itemDimension={45}
                                        data={OPPONENT_MILITARY}
                                        renderItem={({item})  => (
                                            <ProfileInfoOptionBtn
                                                text={item}
                                                selected={(userInfo.opponentFinishedMilitary=== null && item === "무관")
                                                    || (userInfo.opponentFinishedMilitary && item === "군필")
                                                    || (userInfo.opponentFinishedMilitary === false && item === "미필")
                                                }
                                                onPress={() => {
                                                    handleOpponentMilitaryPress(item);
                                                }}
                                            />
                                        )}
                                    />
                                </ProfileInfo>
                            )}
                        </ProfileInfos>
                    </ViewContainer>
                </ScrollView>

            )}
        </>
    )
}

const styles = StyleSheet.create({
    picker : {
        height : 45,
    }
})