import { useEffect, useState, useContext } from "react";
import { AxiosContext } from '../context/request.context';
import useUsers from "./users.hook";

// import { GET_DASHBORD } from "../gql";

function useDashbord() {

    const { authRequest } = useContext(AxiosContext);


    const getDashbord = async ({ stage }) => {

        if (stage) {
            stage = { 'filters[stage][id]': stage }
        }else {
            stage = {}
        }


        return await authRequest({
            url: 'c-position-stages',
            params: {
                populate: '*',
                ...stage
            }
        })
    }

    return {
        getDashbord
    }


}

export default useDashbord;