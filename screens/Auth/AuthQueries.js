import { gql } from "apollo-boost";

export const LOG_IN = gql`
    query login($email : String!, $password : String!){
        login(email : $email, password : $password)
    }
`

export const CHECK_EMAIL_USING = gql`
    query checkEmailUsing($email : String!){
        checkEmailUsing(email : $email)
    }
`

export const REQUEST_SECRET = gql`
    query requestSecret($email : String!, $actualSending : Boolean!){
        requestSecret(email : $email, actualSending : $actualSending)
    }
`

export const CHANGE_PASSWORD = gql`
    mutation changePassword($email : String!, $password : String!){
        changePassword(email : $email, password : $password)
    }
`
export const CREATE_USER = gql`
    mutation createUser($email : String!, $password : String!){
        createUser(email : $email, password : $password)
    }
`