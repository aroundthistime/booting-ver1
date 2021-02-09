import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import Loader from "../../components/Loader";
import { GET_CHATS } from "./ChatQueries";
import ChatsPresenter from "./ChatsPresenter";


export default ({navigation}) => {
    const {loading, data, refetch} = useQuery(GET_CHATS, {
        fetchPolicy : "network-only",
        notifyOnNetworkStatusChange: true
    });
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async() => {
          await refetch();
        });
        return unsubscribe;
      }, [navigation]);
    return (
        <>
            {!loading && data && data.getChats ? (
                <ChatsPresenter chatsList={data.getChats} refetch={refetch} navigation={navigation} />
            ) : (
                <Loader />
            )}
        </>
    )
}