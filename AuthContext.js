import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({isLoggedIn : isLoggedInProp, children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
    const logUserIn = async() => {
        await AsyncStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
    }
    const logUserOut = async() => {
        await AsyncStorage.setItem("isLoggedIn", "false");
        setIsLoggedIn(false);
    }
    return <AuthContext.Provider value={{isLoggedIn, logUserIn, logUserOut}}>{children}</AuthContext.Provider>
}

export const useIsLoggedIn = () => {
    const { isLoggedIn } = useContext(AuthContext);
    return isLoggedIn
}

export const useLogUserIn = () => {
    const { logUserIn } = useContext(AuthContext);
    return logUserIn
}

export const useLogUserOut = () => {
    const { logUserOut } = useContext(AuthContext);
    return logUserOut;
}