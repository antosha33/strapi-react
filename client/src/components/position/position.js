import { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react-lite";

import PositionStatus from "../positionStatus/positionStatus";
import usePosition from "../../hooks/position.hook";
import PositionUser from "../positionUser/positionUser";
import Checkbox from "../ui/checkbox/checkbox";
import Cell from "../cell/cell";
import dashbordStore from '../../store/dashbord'
import OutsideAlerter from "../outsideAlerter/outsideAlerter";





function Position({ id, isUrgent, settings, title, onOrderDetail, user, users, quantity, positionStageId, statuses, status, timestamps, order }) {


	const [positionRef, setPositionRef] = useState(null)
	const { setUser, setStatus } = usePosition();
	const [isVisible, setIsVisible] = useState(true);
	const isSelected = dashbordStore.getIsPositionsSelected(id);
	const [active, setIsActive] = useState(false);
	const [extra, setExtra] = useState(false);

	const onSetUser = async (userId) => {
		await setUser(positionStageId, userId);
	}

	const onSetStatus = async (statusId) => {
		await setStatus(positionStageId, statusId);
	}

	const onSelectPosition = () => {
		dashbordStore.addPosition(id)
	}

	const onPositionHandler = () => {
		setIsActive(!active)
	}

	useEffect(() => {

		const overHandler = (ev) => {
			const { x, y, height } = ev.currentTarget.getBoundingClientRect();
			const { width } = ev.currentTarget.closest('.js-scrollable-dashbord').getBoundingClientRect();
			setExtra({ x, y, width, height });
		}

		const outHandler = () => {
			setExtra(null)
		}

		document.addEventListener('scroll', outHandler)
		if (positionRef) {
			positionRef.addEventListener('mouseover', overHandler)
			positionRef.addEventListener('mouseleave', outHandler)
		}
		return () => {
			document.removeEventListener('scroll', outHandler)
			if (positionRef) {
				positionRef.removeEventListener('mouseover', overHandler)
				positionRef.removeEventListener('mouseover', outHandler)
			}
		}
	}, [positionRef])

	console.log('ex=>', extra)

	if (!isVisible) return null;
	return (
		<OutsideAlerter

			onEvent={() => setIsActive(false)}
			className={`
				${active ? ' border-Accent/Blue ' : 'border-Content/Border'}
				hover:border-Accent/Blue position odd:bg-[#fff] even:bg-Dominant/Light   border mt-[-1px]`}
		>
			<tr
				ref={ref => setPositionRef(ref)}
				className={`flex`}>
				<Cell {...settings.Checkbox}
					className={`
						${isUrgent ? 'after:absolute after:top-[0] after:left-[100%] after:bottom-0 after:w-[0.4rem] after:bg-Accent/Red' : ''}
						absolute bg-white left-0 text-left z-10`}>
					<Checkbox
						active={isSelected}
						onChange={onSelectPosition}
					></Checkbox>
				</Cell>
				<Cell {...settings.Checkbox}
					className="opacity-0 ">
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
				<Cell {...settings.quantity}>{quantity}</Cell>
				<Cell {...settings.quantity}>{quantity}</Cell>
				<Cell {...settings.quantity}>{quantity}</Cell>
				<Cell {...settings.quantity}>{quantity}</Cell>
				<Cell {...settings.quantity}>{quantity}</Cell>
				<Cell {...settings.quantity}>{quantity}</Cell>
				<Cell {...settings.quantity}>{quantity}</Cell>
				<Cell {...settings.quantity}>{quantity}</Cell>
				<Cell {...settings.quantity}>{quantity}</Cell>
				<Cell {...settings.quantity}>{quantity}</Cell>
				<Cell {...settings.quantity}>{quantity}</Cell>
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
				<Cell
					className="absolute bg-white right-0  z-10 w-[4.8rem] ">
					<div
						onClick={onPositionHandler}
						className="w-[20px] h-[20px]">

					</div>
				</Cell>
				<div
					style={{
						height: extra?.height + 2 + 'px',
						right: (window.innerWidth - extra?.width) / 2 + 'px',
						top: extra?.y - 1 + 'px'
					}}
					className={`
					${extra ? 'visible opacity-100 translate-x-[100%]' : 'invisible opacity-0 translate-x-[0%]'}
					border   border-Accent/Blue  top-0 fixed  w-[6rem] bg-black
				`}>

				</div>
			</tr>


		</OutsideAlerter>

	);
}

export default observer(Position);