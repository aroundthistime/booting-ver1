import React  from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useIsLoggedIn } from "../AuthContext";
import AuthNavigation from "../navigations/AuthNavigation";
import TabNavigations from "../navigations/TabNavigations";
import { GET_USER_STATUS, SET_USER_TOKEN } from "../screens/GlobalQueries";
import { UserProvider } from "../UserContext";
import Loader from "./Loader";
import LoggedInNavigation from "../navigations/LoggedInNavigation";
import Banned from "../screens/Banned";
import Deactivated from "../screens/Deactivated";
import SettingsGuide from "../screens/Settings/SettingsGuide";



export default ({token}) => {
    const isLoggedIn = useIsLoggedIn();
    // const isLoggedIn = true;
    if (isLoggedIn){
        const [setUserTokenMutation] = useMutation(SET_USER_TOKEN);
        const {data, loading, refetch} = useQuery(GET_USER_STATUS);
        setUserTokenMutation({
            variables : {
                token
            }
        })
        if (!loading && data && data.getMe){
            if (!data.getMe.isDeactivated && !data.getMe.isBanned){
                return (
                    <UserProvider userObj={data.getMe} refetch={refetch}>
                        <LoggedInNavigation settingsDone={data.getMe.settingsDone}/>
                    </UserProvider>
                )
            } else if (data.getMe.isBanned){
                return (
                    <Banned />
                )
            } else {
                return (
                    <UserProvider userObj={data.getMe} refetch={refetch}>
                       <Deactivated />
                    </UserProvider>
                )
            }
        } else{
            return (
                <Loader />
            )
        }
        // return <SettingsGuide />
        // return <Deactivated />
        // return <Banned />
        // return <TabNavigations />
    } else {
        return <AuthNavigation />
    }
}