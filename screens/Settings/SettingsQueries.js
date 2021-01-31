import { gql } from "apollo-boost";

export const GET_ME = gql`
    query getMe {
        getMe {
            id
            name,
            avatar,
            gender,
            birthYear,
            department,
            height,
            mbti,
            isSmoker,
            drink,
            finishedMilitary,
            datingType,
            avoidSameDepartment,
            opponentAgeTop,
            opponentAgeBottom,
            opponentHeightTop,
            opponentHeightBottom,
            opponentMbti,
            opponentIsSmoker,
            opponentDrink,
            opponentFinishedMilitary
            isDeactivated
        }
    }
`

export const SET_USER_SETTINGS = gql`
    mutation setUserSettings(
        $name : String!,
        $avatar : String!,
        $gender : String!,
        $birthYear : Int!,
        $department : String!,
        $height : Float!,
        $mbti : Mbti!
        $isSmoker : Boolean!,
        $drink : Drink!,
        $finishedMilitary : Boolean!,
        $datingType : [Dating!]!,
        $avoidSameDepartment : Boolean!,
        $opponentAgeTop : Int!,
        $opponentAgeBottom : Int!,
        $opponentHeightTop : Float!,
        $opponentHeightBottom : Float!,
        $opponentMbti : [Mbti!]!,
        $opponentIsSmoker : Boolean,
        $opponentDrink : [Drink!]!,
        $opponentFinishedMilitary : Boolean,
        $isDeactivated : Boolean!
    ){
        setUserSettings(
            name : $name,
            avatar : $avatar,
            gender : $gender,
            birthYear : $birthYear,
            department : $department,
            height : $height,
            mbti : $mbti,
            isSmoker : $isSmoker,
            drink : $drink,
            finishedMilitary : $finishedMilitary,
            datingType : $datingType,
            avoidSameDepartment : $avoidSameDepartment,
            opponentAgeTop : $opponentAgeTop,
            opponentAgeBottom : $opponentAgeBottom,
            opponentHeightTop : $opponentHeightTop,
            opponentHeightBottom : $opponentHeightBottom,
            opponentMbti : $opponentMbti,
            opponentIsSmoker : $opponentIsSmoker,
            opponentDrink : $opponentDrink,
            opponentFinishedMilitary : $opponentFinishedMilitary,
            isDeactivated : $isDeactivated
        )
    }
`