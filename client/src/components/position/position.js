import { useState } from "react";
import { observer } from "mobx-react-lite";

import PositionStatus from "../positionStatus/positionStatus";
import usePosition from "../../hooks/position.hook";
import PositionUser from "../positionUser/positionUser";
import Checkbox from "../ui/checkbox/checkbox";
import Cell from "../cell/cell";
import dashbordStore from '../../store/dashbord'





function Position({ id, isUrgent, settings, title, onOrderDetail, user, users, quantity, positionStageId, statuses, status, timestamps, order }) {


	const { setUser, setStatus } = usePosition();
	const [isVisible, setIsVisible] = useState(true);
	const isSelected = dashbordStore.getIsPositionsSelected(id);

	const onSetUser = async (userId) => {
		await setUser(positionStageId, userId);
	}

	const onSetStatus = async (statusId) => {
		await setStatus(positionStageId, statusId);
	}

	const onSelectPosition = () => {
		dashbordStore.addPosition(id)
	}


	if (!isVisible) return null;
	return (
		<div className={`
			${isUrgent ? 'after:absolute after:top-[0] after:bottom-0 after:w-[0.4rem] after:bg-Accent/Red' : ''}
			odd:bg-[#fff] even:bg-Dominant/Light relative flex border border-Content/Border border-b-0 border-l-0 last:border-b-[1px]
			`}>
			<Cell {...settings.Checkbox}>
				<Checkbox
					active={isSelected}
					onChange={onSelectPosition}
				></Checkbox>
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
			<Cell {...settings.quantity}>{quantity}</Cell>
			<Cell {...settings.order}>
				<span
					onClick={() => onOrderDetail(order.id)}
					className="text-Accent/Blue text-Regular(16_18)">
					{order.orderId}
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

export default observer(Position);