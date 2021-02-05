import { gql } from '@apollo/client';

export const GET_CHATS = gql`
    query getChats{
        getChats{
            id
            participants{
                id
                name
                avatar
            }
            lastMessage{
                text
                from{
                    id
                }
                isChecked
            }
            createdAt
            updatedAt
        }
    }
`

export const QUIT_CHAT = gql`
    mutation quitChat($id : String!){
        quitChat(id : $id)
    }
`

export const GET_CHAT = gql`
    query getChat($id : String!){
        getChat(id : $id){
            id
            participants{
                id
                name
                avatar
                isBanned
                isDeactivated
            }
            messages{
                id
                text
                from{
                    id
                }
                createdAt
                isChecked
            }
        }
    }
`

export const SEND_MESSAGE = gql`
    mutation sendMessage($chatId : String!, $opponentId : String!, $text : String!){
        sendMessage(chatId : $chatId, opponentId : $opponentId, text : $text){
            id
            text
        }
    }
`