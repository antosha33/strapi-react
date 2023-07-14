import { useContext, useCallback } from "react";
import { AxiosContext } from '../context/request.context';
const qs = require('qs');



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

	const setPositionsToUrgent = async ({ids, isUrgent}) => {
		return await authRequest({
			method: 'POST',
			url: 'c-position-stages/setUrgentPosition',
			data: {
				ids,
				isUrgent
			}
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

	const getPosition = useCallback(async ({ positionId }) => {

		const query = qs.stringify({
			populate: {
				order: true,
				c_position_stages: {
					populate: {
						user: true,
						status:true,
						stage: true,
						comments: true
					},
				}
			}
		}, {
			encodeValuesOnly: true, // prettify URL
		});

		return await authRequest({
			url: `positionss/${positionId}?` + query,
		})
	}, [authRequest])


	return {
		setUser,
		setStatus,
		setPositionsToUrgent,
		setStagesToUrgent,
		setComment,
		setPositionsToCanceled,
		getPosition
	}


}

export default usePosition;