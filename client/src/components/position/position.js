
import PositionStatus from "../positionStatus/positionStatus";
import usePosition from "../../hooks/position.hook";
import PositionUser from "../positionUser/positionUser";
import Checkbox from "../ui/checkbox/checkbox";
import { useState } from "react";
import Cell from "../cell/cell";










function Position({ settings, title, onOrderDetail, user, users, quantity, positionStageId, statuses, status, timestamps, order }) {


	const { setUser, setStatus } = usePosition();
	const [isVisible, setIsVisible] = useState(true)

	const onSetUser = async (userId) => {
		await setUser(positionStageId, userId);
	}

	const onSetStatus = async (statusId) => {
		await setStatus(positionStageId, statusId);
	}


	if (!isVisible) return null;

	return (
		<div className="odd:bg-[#fff] even:bg-Dominant/Light flex border border-Content/Border border-b-0 border-l-0 last:border-b-[1px]">
			<Cell {...settings.Checkbox}>
				<Checkbox></Checkbox>
			</Cell>
			<Cell {...settings.user}>
				<PositionUser
					data={users}
					currentData={user}
					onSetData={onSetUser}
				></PositionUser>
			</Cell>
			<Cell {...settings.title} >
				<span className="line-clamp-3">{title}</span>
			</Cell>
			<Cell {...settings.qauntity}>{quantity}</Cell>
			<Cell {...settings.order}>
				<span
					onClick={() => onOrderDetail(order.id)}
					className="text-Accent/Blue text-Regular(16_18)">
					{order.id}
				</span>
			</Cell>
			<Cell {...settings.status}>
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