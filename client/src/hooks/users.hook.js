
import { useContext } from 'react';
import { AxiosContext } from '../context/request.context';
import { AuthContext } from '../context/auth.context';

import usersStore from '../store/users'


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

	const getMe = async () => {
		return await authRequest({
			url: 'users/me?populate=role',
		})
	}

	const getUsers = async () => {
		return await authRequest({
			url: 'users/?populate=role',
		})
	}

	const getUsersByRole = async (role) => {
		console.log(role)
		return await authRequest({
			url: 'users',
			params: {
				role
			}
		})
	}
	

	return {
		authorize,
		getUsers,
		getMe,
		getUsersByRole
	};
}

export default useUsers;