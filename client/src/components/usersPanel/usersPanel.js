
import { useContext, useEffect, useState } from "react";
import Authorization from "../authorization/authorization";
import { AuthContext } from "../../context/auth.context";
import Modal from "../modal/modal";
import useUsers from "../../hooks/users.hook";
import userStore from "../../store/users"
import { observer } from "mobx-react-lite"
import useStorage from "../../hooks/storage.hook";


const User = ({ username, name, active = false }) => {
	return (
		<div
			className={`${!active ? 'hover:bg-Dominant/Dop hover:cursor-pointer' : ''} group p-[1.2rem] ease-in-out duration-300 bg-[#fff] `}>
			<span className="w-[2.4rem]h - [2.4rem]"></span>
			< div className="flex flex-col" >
				<span className="text-Regular(14_16) text-Content/Dark mb-[2px]">{username}</span>
				<div className="flex justify-between text-Regular(12_14) gap-[4rem]">
					<span className={`${active ? 'text-Accent/Dark_Yellow' : ''}`}>{name}</span>
					{active ?
						<span className="text-Accent/Blue">Активен</span>
						:
						<span className="group-hover:opacity-100 ease-in-out duration-300 opacity-0 block rounded-[8px] border border-Accent/Green text-Regular(10_12) text-Accent/Green px-[0.6rem]">Выбрать</span>
					}
				</div>
			</div>
		</div>

	)
}

function UsersPanel() {

	const [isModalOpened, setIsModalOpened] = useState(false);
	const { authState, login } = useContext(AuthContext);
	const { getData } = useStorage();
	const { username, role } = userStore.currentUser;
	const [candidates, setCandidates] = useState([]);
	const [isOtherShowed, setIsOtherShowed] = useState(false)

	useEffect(() => {
		const users = getData('users');
		const current = users.find(x => x.active)
		userStore.setCurrentUser(current);
		const readyUsers = users.filter(x => !x.active);
		setCandidates(readyUsers);
	}, [authState.accessToken])


	const onLoginHandler = (props) => {
		login(props)
	}


	return (
		<div
			onClick={() => setIsOtherShowed(!isOtherShowed)}
			className="w-[32.8rem] relative">
			<div className="border border-Content/Border ">
				<User
					username={username}
					name={role}
					active={true}
				></User>
			</div>
			<div className={`${isOtherShowed ? 'opacity-100 translate-y-0 duration-300 ease-in-out visible' : 'opacity-0 translate-y-[10%] invisible'}  absolute  top-[100%] left-0 right-0 bg-white border border-Content/Border border-t-0`}>
				<div className="max-h-[30rem] overflow-auto">
					{candidates.map(({ accessToken, username, role, id }) =>
						<div
							key={accessToken}
							onClick={() => onLoginHandler({
								accessToken,
								id,
								username,
								role
							})}
						>
							<User
								username={username}
								name={role}
							></User>
						</div>

					)}
				</div>
				<div className="p-[1.2rem]">
					<span className="w-[2.4rem]h - [2.4rem]"></span>
					<span
						onClick={() => setIsModalOpened(true)}
						className="text-Regular(14_16) text-Accent/Blue">Добавить нового пользователя</span>
				</div>

			</div>
			<Modal
				isOpen={isModalOpened}
				closeModal={() => setIsModalOpened(false)}
				title="Авторизуйтесь в системе"
			>
				<Authorization
					afterLogin={() => setIsModalOpened(false)}
				></Authorization>
			</Modal>
		</div>

	);
}

export default observer(UsersPanel);