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
		let localUsers = getData('users');
		localUsers = localUsers.filter(x => x.accessToken !== authState.accessToken);

		if (localUsers.length) {
			const candidate = localUsers[0];
			candidate.active = true
			login({
				accessToken: localUsers[0].accessToken,
				role:  localUsers[0].role
			})
		} else {
			setAuthState(_ => ({
				accessToken: null,
				authenticated: null,
			}));
		}
		setData('users', localUsers);
	});




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
		loadJWT
	}

}