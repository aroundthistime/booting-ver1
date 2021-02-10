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
                createdAt
            }
            createdAt
        }
    }
`

export const NEW_MESSAGE = gql`
    subscription newMessage($id : String!) {
        newMessage(id : $id){
            id
            text
            from{
                id
            }
            createdAt
            chat{
                id
            }
        }
    }
`

export const NEW_CHAT = gql`
    subscription newChat($id : String!){
        newChat(id : $id){
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
                createdAt
            }
            createdAt
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

export const NEW_MESSAGE_FROM_CHAT = gql`
    subscription newMessageFromChat($id : String!) {
        newMessageFromChat(id : $id){
            id
            text
            from{
                id
            }
            createdAt
        }
    }
`

export const READ_MESSAGE = gql`
    mutation readMessage($messageId : String!){
        readMessage(messageId : $messageId)
    }
`

export const  DETECT_MESSAGE_READ = gql`
    subscription detectMessageRead($chatId : String!){
        detectMessageRead(chatId : $chatId){
            message{
                id
            }
        }
    }
`