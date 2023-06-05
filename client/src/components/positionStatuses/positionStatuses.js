import OutsideAlerter from '../outsideAlerter/outsideAlerter'
import Dropdown from "../ui/dropdown/dropdown";
import { useEffect, useState } from "react";

function PositionStatuses({ statuses, currentStatus }) {

	const [isDropDown, setIsDropDown] = useState(false);
	const [status, setStatus] = useState(currentStatus)


	const openDropdown = () => {
		setIsDropDown(true)
	}

	const closeDropdown = () => {
		setIsDropDown(false)
	}

	const onSetUserHandler = (user) => {
		// setUser(user);
		// onSetUser(user.id);
	}

	const renderItem = (item) =>
	<span
		onClick={() => onSetUserHandler(item)}
		style={{
			background: item.color
		}}
		key={item.id} className="block px-[1.2rem] py-[1.2rem]">{item.title}
	</span>;

	return (
		<OutsideAlerter onEvent={closeDropdown} className="w-[100%] flex">
			<div
				onClick={openDropdown}
				style={{
					background: status.color
				}}
				className=" text-Regular(16_18) relative w-[100%] px-[1.2rem] py-[0.9rem]">
				{status ?
					<div className="">{status?.title || currentStatus.title}</div> :
					<div className="text-Accent/Red font-medium">Выбрать ответственного</div>
				}
				<Dropdown active={isDropDown} data={statuses}>
					{renderItem}
				</Dropdown>


			</div>

		</OutsideAlerter>);
}

export default PositionStatuses;