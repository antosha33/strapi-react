
import { useContext, useEffect, useState } from 'react';
import { AxiosContext } from '../context/request.context';
import { AuthContext } from '../context/auth.context';

import usersStore from '../store/users'


function useStatus() {

	const { authRequest } = useContext(AxiosContext);

	const getStatuses = async ({ stage } = {}) => {

		if (stage) {
			stage = { 'filters[stage][id]': stage }
		} else {
			stage = {}
		}


		return await authRequest({
			url: 'statuses',
			params: {
				populate: '*',
				...stage
			}
		})
	}



	return {
		getStatuses
	};
}

export default useStatus;