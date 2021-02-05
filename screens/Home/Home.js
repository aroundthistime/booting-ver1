import React from "react";
import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import ViewContainer from "../../components/ViewContainer";
import HomePresenter from "./HomePresenter";
import { GET_USERS } from "./HomeQueries";





export default () => {
    const {loading, data, refetch} = useQuery(GET_USERS,{
        fetchPolicy : "network-only",
        notifyOnNetworkStatusChange: true
    });
    return (
        <ViewContainer>
            {!loading && data && data.getUsers ? (
                (
                    <HomePresenter users={data.getUsers} refetch={refetch}/>
                )
            ) : (
                <Loader></Loader>
            )}
        </ViewContainer>
    )
}