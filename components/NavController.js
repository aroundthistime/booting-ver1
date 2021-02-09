import React  from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useIsLoggedIn } from "../AuthContext";
import AuthNavigation from "../navigations/AuthNavigation";
import TabNavigations from "../navigations/TabNavigations";
import { GET_USER_STATUS, setUserToken } from "../screens/GlobalQueries";
import { UserProvider } from "../UserContext";
import Loader from "./Loader";
import LoggedInNavigation from "../navigations/LoggedInNavigation";



export default ({token}) => {
    const isLoggedIn = useIsLoggedIn();
    // // const isLoggedIn = true;
    if (isLoggedIn){
        const [setUserTokenMutation] = useMutation(setUserToken);
        const {data, loading, refetch} = useQuery(GET_USER_STATUS);
        setUserTokenMutation({
            variables : {
                token
            }
        })
        if (!loading && data && data.getMe){
            return (
                <UserProvider userObj={data.getMe} refetch={refetch}>
                    <LoggedInNavigation/>
                </UserProvider>
            )
        } else{
            return (
                <Loader />
            )
        }
        // return <TabNavigations />
    } else {
        return <AuthNavigation />
    }
}