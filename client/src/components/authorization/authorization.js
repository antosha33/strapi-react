
import { useState, useContext } from "react";
// import { gql, useMutation, useLazyQuery } from '@apollo/client';

import Input from "../ui/input/input";
import Button from "../ui/button/button";
import { simplifyStrapiObject } from "../../utils/simplifyStrapiObject";
import { AuthContext } from "../../context/auth.context";
import { AxiosContext } from '../../context/request.context';
import useUsers from "../../hooks/users.hook";


function Authorization({ afterLogin }) {



	const { authRequest } = useContext(AxiosContext);
	const { login } = useContext(AuthContext);
	const { authorize } = useUsers();


	const [credentials, setCredentials] = useState({
		login: null,
		password: null
	})

	const onLoginHandler = ({ target: { value } }) => {
		setCredentials(credentials => ({
			...credentials,
			login: value
		}))
	}

	const onPasswordHandler = ({ target: { value } }) => {
		setCredentials(credentials => ({
			...credentials,
			password: value
		}))
	}

	const onSubmitHandler = async () => {
		try {
			const { jwt } = await authorize({
				identifier: credentials.login,
				password: credentials.password
			})

			const data = await authRequest({
				url: 'users/me?populate=role',
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			})

			login({
				accessToken: jwt,
				username: data.username,
				role: data.role.name,
				id: data.id
			})

			afterLogin && afterLogin();

		} catch (error) {
			alert('Неверные данные для входа')
		}




	}


	return (
		<div className="p-[5rem] bg-Dominant/Dop w-[62.6rem]">
			<div>
				<Input
					onInput={onLoginHandler}
					label="Введите ваш логин"
					placeholder="Введите ваш логин"
				></Input>
				<Input
					onInput={onPasswordHandler}
					label="Введите ваш пароль"
					placeholder="Введите ваш пароль"
				></Input>
			</div>
			<span className="bg-Accent/Rose p-[1rem] text-Regular(12_14) text-Content/Dark mt-[1.2rem] block text-left">Получить ваш логин и пароль вы можете у начальника производства Александра Иванова</span>
			<div className="mt-[5rem] max-w-[23rem] m-auto">
				<Button
					onPress={onSubmitHandler}
					name="Авторизоваться"
				></Button>
			</div>

		</div>
	);
}

export default Authorization;