import { useState, useCallback, useEffect, useContext } from 'react';
import useStorage from './storage.hook';
import { AxiosContext } from '../context/request.context';



export const useAuth = () => {

	const { setData, getData } = useStorage();


	const [authState, setAuthState] = useState({
		accessToken: null,
		authenticated: null,
	})

	useEffect(() => {
		loadJWT()
	}, [])



	const login = useCallback(async (props) => {

		setAuthState(prev => ({
			...prev, ...{
				accessToken: props.accessToken,
				authenticated: true,
				role: props.role
			}
		}));

		let localUsers = getData('users');

		if (!localUsers) {
			localUsers = []
		} else {
			localUsers = localUsers.filter(x => x.id != props.id);
			localUsers.forEach(x => x.active = false);
		}

		localUsers.push({
			...props,
			active: true
		})


		setData('users', localUsers);
	})


	const logout = useCallback(async () => {
		// await del('accessToken');
		// await del('refreshToken');
		// await del('delivery');
		// unsubscribeNotifications();
		// setAuthState({
		// 	accessToken: null,
		// 	refreshToken: null,
		// 	authenticated: null,
		// 	delivery: null,
		// });
	});



	const updateState = useCallback((accessToken, refreshToken) => {
		// setAuthState(prev => ({
		// 	...prev,
		// 	accessToken,
		// 	refreshToken
		// }));
	})



	const loadJWT = () => {
		const localUsers = getData('users') || [];
		const { accessToken, role } = localUsers.find(x => x.active) || {};
		if (accessToken) {
			setAuthState(prev => ({
				...prev, ...{
					accessToken,
					authenticated: true,
					role
				}
			}));
		}
		if (localUsers.length) {
			// writeCache(localUsers)
		}
	};





	return {
		login,
		authState,
		logout,
		loadJWT,
		updateState
	}

}