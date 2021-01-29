import { gql } from "apollo-boost";

export const GET_ME = gql`
    query getMe {
        getMe {
            id,
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
        }
    }
`