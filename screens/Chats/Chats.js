import { useQuery } from "@apollo/client";
import React from "react";
import Loader from "../../components/Loader";
import { GET_CHATS } from "./ChatQueries";
import ChatsPresenter from "./ChatsPresenter";


export default ({navigation}) => {
    const {loading, data, refetch} = useQuery(GET_CHATS, {
        fetchPolicy : "network-only",
        notifyOnNetworkStatusChange: true
    });
    return (
        <>
            {!loading && data && data.getChats ? (
                <ChatsPresenter chats={data.getChats} refetch={refetch} navigation={navigation} />
            ) : (
                <Loader />
            )}
        </>
    )
}