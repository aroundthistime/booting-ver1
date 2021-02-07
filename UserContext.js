import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({userObj : userobjProp, refetch, children}) => {
    const [userObj, setUserObj] = useState(userobjProp);
    const refreshUser = async() => {
        if (typeof refetch === "function"){
            const {data : {getMe}} = await refetch();
            setUserObj(getMe);
        }
    }
    return <UserContext.Provider value={{userObj, refreshUser}}>{children}</UserContext.Provider>
}

export const getUserObj = () => {
    const {userObj} = useContext(UserContext);
    return userObj
}

export const refreshUserObj = () => {
    const {refreshUser} = useContext(UserContext);
    return refreshUser
}