import { gql } from "apollo-boost";

export const REPORT_USER = gql`
    mutation reportUser($id : String!, $reason : String!){
        reportUser(id : $id, reason : $reason)
    }
`