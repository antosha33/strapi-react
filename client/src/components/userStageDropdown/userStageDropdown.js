import { useState } from "react";

import OutsideAlerter from '../outsideAlerter/outsideAlerter'
import Dropdown from "../ui/dropdown/dropdown";

function UserStageDropdown({ users, currentUser }) {

	const [isDropDown, setIsDropDown] = useState(false);


	const openDropdown = () => {
		if (!currentUser) {
			setIsDropDown(true)
		}
	}

	const closeDropdown = () => {
		setIsDropDown(false)
	}

	const renderItem = (item) => <span key={item.id} className="block px-[1.2rem] py-[1.2rem]">{item.username}</span>;

	return (
		<OutsideAlerter onEvent={closeDropdown}>
			<div
				onClick={openDropdown}
				className=" text-Regular(16_18) relative">
				{currentUser ?
					<div className="">{currentUser.username}</div> :
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