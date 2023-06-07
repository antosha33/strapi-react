import { useEffect, useState, useContext } from "react";
import { AxiosContext } from '../context/request.context';
const qs = require('qs');





// import { GET_DASHBORD } from "../gql";

function useDashbord() {

	const { authRequest } = useContext(AxiosContext);


	const getDashbord = async ({ stage }) => {

		if (stage) {
			stage = {
				filters: {
					stage: {
						id: stage
					},

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
					populate:{
						order: true 
					},
				},
			},

			...stage,
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