import { useEffect, useState } from "react";

import OutsideAlerter from '../outsideAlerter/outsideAlerter'
import Dropdown from "../ui/dropdown/dropdown";


function UserStageDropdown({ users, currentUser, onSetUser }) {

	const [isDropDown, setIsDropDown] = useState(false);
	const [user, setUser] = useState(currentUser)

	const openDropdown = () => {
		setIsDropDown(true)
	}

	const closeDropdown = () => {
		setIsDropDown(false)
	}

	const onSetUserHandler = (user) => {
		setUser(user);
		onSetUser(user.id);
	}


	const renderItem = (item) =>
		<span
			onClick={() => onSetUserHandler(item)}
			key={item.id} className="block px-[1.2rem] py-[1.2rem]">{item.username}
		</span>;

	return (
		<OutsideAlerter onEvent={closeDropdown} className="w-[100%]">
			<div
				onClick={openDropdown}
				className=" text-Regular(16_18) relative px-[1.2rem] py-[0.9rem]">
				{user ?
					<div className="">{user?.username || currentUser.username}</div> :
					<div className="text-Accent/Red font-medium">Выбрать ответственного</div>
				}
				<Dropdown active={isDropDown} data={users}>
					{renderItem}
				</Dropdown>


			</div>

		</OutsideAlerter>


	);
}

export default UserStageDropdown;