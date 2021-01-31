import React, { useState } from "react";
import styled from "styled-components";
import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import constants from "../../constants";
import Loader from "../../components/Loader";
import { Platform } from "react-native";
import { BoxShadow } from "react-native-shadow";

const NoUser = styled.Text``

const UserImagesContainer = styled.View`
    position : relative;
    margin-bottom : 60;
    width : ${constants.width / 1.3};
    height : ${constants.width / 1.3};
`

const UserImage = styled.Image`
    width : ${constants.width / 1.3};
    height : ${constants.width / 1.3};
    border-radius : 15;
    position : absolute;
    top : 0;
    left : 0;
`

const UserButtons = styled.View`
    width : ${constants.width / 1.4};
    flex-direction : row;
    justify-content : space-between;
    position : absolute;
    bottom : ${constants.height / 14};
`

const UserButtonContainer = styled.TouchableOpacity`
    width : 60;
    height : 60;
    justify-content : center;
    align-items : center;
    background-color : #fcfcfc;
    border-radius : 30;
    box-shadow: 10px 5px 5px black;
    border : 1.1px solid rgba(0, 0, 0, 0.025);
`

const UserButtonLike = () => (
    <UserButtonContainer>
        <FontAwesome name="heart" size={24} color="red" />
    </UserButtonContainer>
)

const UserButtonDislike = () => (
    <UserButtonContainer>
        <FontAwesome5 name="times" size={24} color="#42a0f7" />
    </UserButtonContainer>
)

const UserButtonReport = () => (
    <UserButtonContainer>
        <Feather name="alert-triangle" size={24} color="black" />
    </UserButtonContainer>
)

const shadowOpt = {
    width: constants.width / 1.3,
    height:constants.width / 1.3,
    color:"#000",
    border:10,
    radius:3,
    opacity:0.1,
    x:5,
    y:5,
    style:{marginVertical:5}
}

export default ({
    users,
    refetch,
}) => {
    users.reverse();
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);
    const getMoreUsers = async() => {
        setLoading(true);
        const { data : {getUsers}} = await refetch();
        users = getUsers;
        setCurrent(0);
        setLoading(false);
    }
    const getNextUser = () => {
        if (current === users.length - 1){
            getMoreUsers();
        } else{
            setCurrent(current + 1);
        }
    }
    const likeUser = () => {
        
    }
    return (
        <>
            {loading && (
                <Loader />
            )}
            {!loading && users.length > 0 && (
                <>
                    <BoxShadow setting={shadowOpt}>
                        <UserImagesContainer>
                            {users.map(user => <UserImage source={{uri : user.avatar}} />)}
                        </UserImagesContainer>
                    </BoxShadow>
                    <UserButtons>
                        <UserButtonContainer>
                            <UserButtonLike />
                        </UserButtonContainer>
                        <UserButtonContainer>
                            <UserButtonDislike />
                        </UserButtonContainer>
                    </UserButtons>
                </>
            )}
            {!loading && users.length === 0 && (
                <NoUser>
                    현재 이상형에 부합하는 유저가 더 이상 존재하지 않습니다{"\n"}이상형 기준을 수정하거나 나중에 다시 시도해주세요
                </NoUser>
            )}
        </>
    )
}
