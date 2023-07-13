
import { useCallback, useContext } from 'react';
import { AxiosContext } from '../context/request.context';
const qs = require('qs');

function useUsers() {

	const { publicRequest, authRequest } = useContext(AxiosContext);


	const authorize = async ({ identifier, password }) => {
		return await publicRequest({
			url: 'auth/local',
			method: 'POST',
			data: {
				identifier,
				password
			}
		})

	}

	const getMe = useCallback(async () => {
		return await authRequest({
			url: 'users/me?populate=role',
		})
	},[authRequest])



	const getUsers = useCallback(async () => {

		const query = qs.stringify({
			populate: {
				m_roles: true,
			},
		}, {
			encodeValuesOnly: true
		});

		return await authRequest({
			url: 'users/?' + query,
		})
	},[authRequest])

	const getUsersByRole = async (role) => {
		return await authRequest({
			url: 'users',
			params: {
				role
			}
		})
	}

	const saveSettings = async ({ settings }) => {
		return await authRequest({
			method: 'PUT',
			url: 'user/update',
			data: {
				settings
			}
		})
	}


	return {
		authorize,
		getUsers,
		getMe,
		getUsersByRole,
		saveSettings
	};
}

export default useUsers;