import { useEffect, useState, useContext } from "react";
import { AxiosContext } from '../context/request.context';
import useUsers from "./users.hook";



function usePosition() {

	const { authRequest } = useContext(AxiosContext);

	const setStageUser = async(positionStageId, userId) => {
		return await authRequest({
			method: 'PUT',
			url: 'c-position-stages/' + positionStageId,
			data: {
				user: userId
			}
		})
	}


	return {
		setStageUser
	}


}

export default usePosition;