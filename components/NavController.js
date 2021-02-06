import React from "react";
import { useQuery } from "@apollo/client";
import { useIsLoggedIn } from "../AuthContext";
import AuthNavigation from "../navigations/AuthNavigation";
import TabNavigations from "../navigations/TabNavigations";
import { GET_USER_STATUS } from "../screens/GlobalQueries";
import { UserProvider } from "../UserContext";
import Loader from "./Loader";

export default () => {
    const isLoggedIn = useIsLoggedIn();
    if (isLoggedIn){
        const {data, loading, refetch} = useQuery(GET_USER_STATUS);
        if (!loading && data && data.getMe){
            return (
                <UserProvider userObj={data.getMe} refetch={refetch}>
                    <TabNavigations/>
                </UserProvider>
            )
        } else{
            return <Loader />  
        }
        return <TabNavigations />
    } else {
        return <AuthNavigation />
    }
}