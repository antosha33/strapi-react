import { useCallback, useContext } from "react";
import { AxiosContext } from '../context/request.context';
const qs = require('qs');




function useDashbord() {

	const { authRequest } = useContext(AxiosContext);


	const getDashbord = useCallback(async ({ stage, page, filter, sort }) => {

		if (!sort.path) {
			sort = ['isUrgent:desc', 'id:desc']
		}

		if (stage) {
			stage = {
				filters: {
					stage: {
						id: stage
					},
					...filter,
					isCurrentStage: true
				}
			}
		} else {
			stage = {}
		}

		const query = qs.stringify({
			populate: {
				stage:true,
				status: true,
				user: true,
				comments: {
					sort: ['createdAt:desc']
				},
				position: {
					populate: {
						order: true
					},
				},
			},
			pagination: {
				page
			},
			...stage,
			sort
		}, {
			encodeValuesOnly: true, // prettify URL
		});


		return await authRequest({
			url: 'c-position-stages?' + query,
		})
	},[authRequest])

	return {
		getDashbord
	}


}

export default useDashbord;