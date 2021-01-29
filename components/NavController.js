import React from "react";
import { useIsLoggedIn } from "../AuthContext";
import AuthNavigation from "../navigations/AuthNavigation";
import TabNavigations from "../navigations/TabNavigations";

export default () => {
    const isLoggedIn = useIsLoggedIn();
    // const isLoggedIn = true;
    if (isLoggedIn){
        return <TabNavigations />
    } else {
        return <AuthNavigation />
    }
}