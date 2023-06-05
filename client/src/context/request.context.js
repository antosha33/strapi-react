import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { AuthContext } from './auth.context';
import axios from 'axios';

const config = {
	baseUrl: 'http://localhost:1337/api/'
}



export const AxiosContext = createContext();
const { Provider } = AxiosContext;




export const AxiosProvider = ({ children }) => {

	const { authState: { accessToken, refreshToken, authenticated }, login, logout } = useContext(AuthContext);
	const tempRefreshToken = useRef(null);

	const authAxios = axios.create({
		baseURL: config.baseUrl
	});

	const publicAxios = axios.create({
		baseURL: config.baseUrl
	});


	authAxios.interceptors.request.use(
		config => {
			if (!config.headers.Authorization && accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}
			return config;
		},
		error => {
			return Promise.reject(error);
		},
	);



	const publicRequest = useCallback(async ({ url, method = 'GET', data = null, headers = {}, params = {} }) => {
		try {
			const response = await publicAxios(
				{
					method,
					url,
					data,
					params
				}
			)
			return response.data;
		} catch (error) {
			throw error.response?.data?.error;
		}
	})

	const authRequest = (async ({ url, method = 'GET', data = null, headers = {}, params = {} }) => {
		try {
			const response = await authAxios(
				{
					method,
					url,
					data,
					params,
					headers
				}
			)
			return response.data;
		} catch (error) {
			throw error.response?.data;
		}
	})

	const httpRequest = useCallback(async ({ url, method = 'GET', headers = {}, mode = 'cors', data }) => {
		try {
			const response = await axios({
				method,
				url,
				headers,
				mode,
				data
			}
			)
			return response.data;
		} catch (error) {
			throw error;
		}

	})



	return (
		<Provider
			value={{
				authRequest,
				publicRequest,
				httpRequest
			}}>
			{children}
		</Provider>
	);
}

