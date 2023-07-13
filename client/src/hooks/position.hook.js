import { useEffect, useState, useContext } from "react";
import { AxiosContext } from '../context/request.context';
import useUsers from "./users.hook";



function usePosition() {

	const { authRequest } = useContext(AxiosContext);

	const setUser = async (positionStageId, userId) => {
		try {
			return await authRequest({
				method: 'PUT',
				url: 'c-position-stages/updateUser/' + positionStageId,
				data: {
					user: userId
				}
			})
		} catch {

		}

	}

	const setStatus = async (positionStageId, statusId) => {
		try {
			return await authRequest({
				method: 'PUT',
				url: 'c-position-stages/updateStatus/' + positionStageId,
				data: {
					status: statusId
				}
			})
		} catch {

		}

	}

	const setPositionsToUrgent = async (ids) => {
		return await authRequest({
			method: 'POST',
			url: 'c-position-stages/setUrgentPosition',
			data: ids
		})
	}

	const setStagesToUrgent = async (ids) => {
		return await authRequest({
			method: 'PUT',
			url: 'c-position-stages/setUrgentStage',
			data: ids
		})
	}

	const setPositionsToCanceled = async (ids) => {
		return await authRequest({
			method: 'POST',
			url: 'c-position-stages/setPositionsToCanceled',
			data: ids
		})
	}

	const setComment = async (data) => {
		return await authRequest({
			method: 'POST',
			url: 'comments',
			data,
		})
	}


	return {
		setUser,
		setStatus,
		setPositionsToUrgent,
		setStagesToUrgent,
		setComment,
		setPositionsToCanceled
	}


}

export default usePosition;