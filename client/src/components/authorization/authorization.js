
import { useState, useContext } from "react";
import Input from "../ui/input/input";
import Button from "../ui/button/button";
import { AuthContext } from "../../context/auth.context";
import { AxiosContext } from '../../context/request.context';
import useUsers from "../../hooks/users.hook";
const qs = require('qs');


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
			const { jwt, user: { username, id } } = await authorize({
				identifier: credentials.login,
				password: credentials.password
			})


			const query = qs.stringify({
				populate: {
					m_roles:{
						populate: {
							stages: true
						}
					},
				},

			}, {
				encodeValuesOnly: true, // prettify URL
			});

			const { m_roles: roles } = await authRequest({
				url: `users/${id}?` + query ,
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			})

			login({
				accessToken: jwt,
				username: username,
				role: roles[0],
				id
			})

			afterLogin && afterLogin();

		} catch (error) {
			alert('Неверные данные для входа')
		}




	}


	return (
		<div className="p-[7rem]">
			<span className='block text-center text-Regular(48_52) text-Content/Dark mb-[5rem]'>Авторизуйтесь в системе</span>
			<div className="p-[5rem] bg-Dominant/Dop w-[62.6rem] ">
				<div className="flex flex-col gap-[2.6rem]">
					<Input
						icon="icon-user"
						onInput={onLoginHandler}
						label="Введите ваш логин"
						placeholder="Введите ваш логин"
					></Input>
					<Input
						icon="icon-lock"
						password={true}
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
		</div>

	);
}

export default Authorization;