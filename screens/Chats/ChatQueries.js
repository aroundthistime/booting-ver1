import { gql } from "apollo-boost";

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