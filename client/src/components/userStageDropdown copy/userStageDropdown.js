import { useState } from "react";
import OutsideAlerter from '../outsideAlerter/outsideAlerter'


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

	return (
		<OutsideAlerter onEvent={closeDropdown}>
			<div
				onClick={openDropdown}
				className=" text-Regular(16_18) relative">
				{currentUser ?
					<div className="">{currentUser.username}</div> :
					<div className="text-Accent/Red font-medium">Выбрать ответственного</div>
				}


				<div className={`
					${isDropDown ? 'duration-200 translate-y-[0%]' : 'invisible opacity-0 translate-y-[10%]'}
					ease-in-out left-[-1.2rem] right-[-1.2rem]  z-10 border bg-white  top-[calc(100%+1.2rem)] absolute max-h-[33.5rem] overflow-auto
				`}>
					{users.map(x =>
						<span key={x.id} className="block px-[1.2rem] py-[1.2rem]">{x.username}</span>
					)}
				</div>
			</div>

		</OutsideAlerter>


	);
}

export default UserStageDropdown;