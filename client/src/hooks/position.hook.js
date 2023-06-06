import { useEffect, useState, useContext } from "react";
import { AxiosContext } from '../context/request.context';
import useUsers from "./users.hook";



function usePosition() {

	const { authRequest } = useContext(AxiosContext);

	const setUser = async(positionStageId, userId) => {
		return await authRequest({
			method: 'PUT',
			url: 'c-position-stages/' + positionStageId,
			data: {
				user: userId
			}
		})
	}

	const setStatus = async(positionStageId, statusId) => {
		return await authRequest({
			method: 'PUT',
			url: 'c-position-stages/updateStatus/' + positionStageId,
			data: {
				status: statusId
			}
		})
	}


	return {
		setUser,
		setStatus
	}


}

export default usePosition;