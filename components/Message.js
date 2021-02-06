import React from "react";
import styled from "styled-components";
import constants from "../constants";

const OpponentMessage = styled.Text`
    border-radius : 10;
    background-color : white;
    padding-top : 5;
    padding-bottom : 5;
    padding-left : 10;
    padding-right : 10;
    margin-bottom : 5;
    max-width : ${constants.width / 2};
`

const OpponentAvatar = styled.Image`
    width : 40;
    height : 40;
    border-radius : 20;
    margin-right : 10;
`

const OpponentMessageWithAvatar = styled.View`
    align-self : flex-start;
    flex-direction : row;
`


const MyMessage = styled.Text`
    border-radius : 10;
    background-color : ${props => props.theme.pastelBtn}
    padding-top : 5;
    padding-bottom : 5;
    padding-left : 10;
    padding-right : 10;
    margin-bottom : 5;
    max-width : ${constants.width / 2};
`

const MessageTime = styled.Text`
    font-size : 12;
    opacity : 0.6;
    align-self : flex-end;
    padding-bottom : 5;
`

const MessageContainer = styled.View`
    flex-direction : row;
`

export default ({fromMe, text, avatar, isMyFirst, createdAt=""}) => {
    if (fromMe){
        if (isMyFirst){
            return (
                <MessageContainer style={{alignSelf : "flex-end"}}>
                    <MessageTime style={{marginRight : 5}}>{createdAt}</MessageTime>
                    <MyMessage style={{marginTop : 10}}>{text}</MyMessage>
                </MessageContainer>
            )
        } else{
            return (
                <MessageContainer style={{alignSelf : "flex-end"}}>
                    <MessageTime style={{marginRight : 5}}>{createdAt}</MessageTime>
                    <MyMessage>{text}</MyMessage>
                </MessageContainer>
            )
        }
    } else if (avatar){
        return (
            <OpponentMessageWithAvatar style={{marginTop : 10}}>
                <OpponentAvatar source={{uri : avatar}} />
                <MessageContainer>
                    <OpponentMessage style={{alignSelf : "flex-end"}}>{text}</OpponentMessage>
                    <MessageTime style={{marginLeft : 5}}>{createdAt}</MessageTime>
                </MessageContainer>
            </OpponentMessageWithAvatar>
        )
    } else{
        return (
            <MessageContainer>
                <OpponentMessage style={{ alignSelf : "flex-start",marginLeft : 50}}>
                    {text}
                </OpponentMessage>
                <MessageTime style={{marginLeft : 5}}>{createdAt}</MessageTime>
            </MessageContainer>
        )
    }
}