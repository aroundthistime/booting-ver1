import { gql } from "apollo-boost";

export const GET_USERS = gql`
    query getUsers {
        getUsers{
            id
            avatar
            name
        }
    }
`

export const CREATE_RESPONSE = gql`
    mutation createResponse($id : String!, $isLike : Boolean!){
        createResponse(id : $id, isLike : $isLike)
    }
`