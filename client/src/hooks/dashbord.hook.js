import { useContext } from "react";
import { AxiosContext } from '../context/request.context';
const qs = require('qs');




function useDashbord() {

	const { authRequest } = useContext(AxiosContext);


	const getDashbord = async ({ stage, page, filter, sort }) => {

		console.log('sot',sort)

		if (stage) {
			stage = {
				// sort: [ 'isUrgent:desc', 'id:desc'],
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
				status: true,
				user: true,
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
	}

	return {
		getDashbord
	}


}

export default useDashbord;