import { gql } from "@apollo/client";

export const REPORT_USER = gql`
    mutation reportUser($id : String!, $chatId : String, $reason : String!){
        reportUser(id : $id, chatId : $chatId, reason : $reason)
    }
`

export const GET_USER_STATUS = gql`
    query getUserStatus{
        getMe{
            id
            isBanned
            isDeactivated
            settingsDone
        }
    }
`