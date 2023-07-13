import { useCallback, useContext } from "react";
import { AxiosContext } from '../context/request.context';
const qs = require('qs');

function useOrder() {

	const { authRequest } = useContext(AxiosContext);

	const getOrder = useCallback(async ({ id, currentStage = true }) => {

		const filters = currentStage ? {
			isCurrentStage: true
		} : {}

		const query = qs.stringify({
			populate: {
				userinfo: true,
				positions: {
					filters: {

					},
					populate: {
						c_position_stages: {
							filters: filters,
							populate: {
								stage: true,
								status: true,
								user: true,
								comments: true
							}
						}
					}
				},

			}
		}, {
			encodeValuesOnly: true, // prettify URL
		});


		return await authRequest({
			url: `orders/${id}?` + query,
		})

	}, [authRequest])

	return {
		getOrder
	};
}

export default useOrder;