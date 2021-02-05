import React  from "react";
import { useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import { GET_ME  } from "./SettingsQueries";
import UserSettingsPresenter from "./UserSettingsPresenter";


export default ({route, navigation}) => {
    const {loading, data } = useQuery(GET_ME, {
        fetchPolicy : "network-only"
    });
    return (
        <>
            {loading && (
                <Loader></Loader>
            )}
            {!loading && data && data.getMe && <UserSettingsPresenter {...data.getMe} navigation={navigation} route = {route} />}
        </>
    )
}
