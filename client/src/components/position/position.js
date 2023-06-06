
import PositionStatus from "../positionStatus/positionStatus";
import usePosition from "../../hooks/position.hook";
import PositionUser from "../positionUser/positionUser";
import { useState } from "react";


const settings = [{
	user: {
		available: true,
		title: 'Ответственный'
	},
	code: {
		available: true,
		title: 'Ответственный'
	},
	title: {
		available: true,
		title: 'Назв-е товара'
	},
	qauntity: {
		available: true,
		title: 'Кол-во'
	}
}]


function Cell({ padding = true, children, ...props }) {

	return (
		<div className={`
			${padding ? 'px-[1.2rem] py-[0.9rem]' : ''}
			h-[6rem]  flex border border-Content/Border border-t-0 border-l-0 border-b-0 ${props.className}
			`} >
			{children}
		</div>
	)
}




function Position({ title, user, users, positionStageId, statuses, status, timestamps }) {

	

	const { setUser, setStatus } = usePosition();
	const [isVisible, setIsVisible] = useState(true)

	const onSetUser = async (userId) => {
		await setUser(positionStageId, userId);
	}

	const onSetStatus = async (statusId) => {
		await setStatus(positionStageId, statusId);
	}


	if(!isVisible) return null;

	return (
		<div className="odd:bg-[#fff] even:bg-Dominant/Light flex border border-Content/Border border-b-0 last:border-b-[1px]">
			<Cell className="w-[4.8rem]"></Cell>
			<Cell className="w-[16rem]" padding={false}>
				<PositionUser
					data={users}
					currentData={user}
					onSetData={onSetUser}
				></PositionUser>
			</Cell>
			<Cell className="w-[21.7rem] text-Regular(12_14)">{title}</Cell>
			<Cell className="w-[18.7rem]" padding={false}>
				<PositionStatus
					data={statuses}
					currentData={status}
					onSetData={onSetStatus}
					setIsVisible={setIsVisible}
					timestamps={timestamps}
				></PositionStatus>
			</Cell>
			<Cell className="w-[13.2rem]"></Cell>
			<Cell className="w-[17.2rem]"></Cell>
		</div>
	);
}

export default Position;