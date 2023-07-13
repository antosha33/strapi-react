
import { useCallback, useContext, useEffect, useState } from "react";
import Authorization from "../authorization/authorization";
import { AuthContext } from "../../context/auth.context";
import Modal from "../modal/modal";
import ConfirmModal from "../modals/confirmModal/confirmModal";
import userStore from "../../store/users"
import { observer } from "mobx-react-lite"
import useStorage from "../../hooks/storage.hook";
import OutsideAlerter from '../outsideAlerter/outsideAlerter'


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
	const [isModalLogoutOpened, setIsModalLogoutOpened] = useState(false);
	const { authState, login, logout } = useContext(AuthContext);
	const { getData } = useStorage();
	const { username, role } = userStore.currentUser;
	const [candidates, setCandidates] = useState([]);
	const [isOtherShowed, setIsOtherShowed] = useState(false)

	const closeOther = useCallback(() => {
		setIsOtherShowed(false)
	}, [])

	useEffect(() => {
		const users = getData('users');
		const current = users.find(x => x.active);
		userStore.setCurrentUser(current);
		const readyUsers = users.filter(x => !x.active);
		setCandidates(readyUsers);
	}, [authState.accessToken, getData])


	const onLoginHandler = (props) => {
		login(props)
	}

	const onLogoutHandler = () => {
		setIsModalLogoutOpened(false);
		logout();
	}


	return (
		<div
			onClick={(ev) => ev.stopPropagation()}
		>
			<span
				onClick={setIsModalLogoutOpened}
				className="hover:cursor-pointer text-Regular(12_14) text-Content/Middle mb-[0.4rem] block">Выйти</span>
			<OutsideAlerter
				onEvent={closeOther}
			>
				<div
					onClick={() => setIsOtherShowed(true)}
					className="w-[32.8rem] relative hover:cursor-pointer">
					<div className="border border-Content/Border ">
						<User
							username={username}
							name={role?.name}
							active={true}
						></User>
					</div>
					<div className={`${isOtherShowed ? 'opacity-100 translate-y-0 duration-300 ease-in-out visible' : 'opacity-0 translate-y-[10%] invisible'} z-20  absolute  top-[100%] left-0 right-0 bg-white border border-Content/Border border-t-0`}>
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
										name={role?.name}
									></User>
								</div>

							)}
						</div>
						<div className="p-[1.2rem] hover:cursor-pointer">
							<span className="w-[2.4rem]h - [2.4rem]"></span>
							<span
								onClick={() => setIsModalOpened(true)}
								className="text-Regular(14_16) text-Accent/Blue">Добавить нового пользователя</span>
						</div>

					</div>
					<Modal
						isOpen={!!isModalOpened}
						closeModal={() => setIsModalOpened(false)}
					>
						<Authorization
							afterLogin={() => setIsModalOpened(false)}
						></Authorization>
					</Modal>

				</div>
			</OutsideAlerter>
			<Modal
				isOpen={!!isModalLogoutOpened}
				closeModal={() => setIsModalLogoutOpened(false)}
			>
				<ConfirmModal
					onResolve={onLogoutHandler}
					onReject={() => setIsModalLogoutOpened(false)}
				>
				</ConfirmModal>
			</Modal>

		</div>


	);
}

export default observer(UsersPanel);