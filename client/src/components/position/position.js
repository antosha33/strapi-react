import { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";



import PositionStatus from "../positionStatus/positionStatus";
import usePosition from "../../hooks/position.hook";
import PositionUser from "../positionUser/positionUser";
import Checkbox from "../ui/checkbox/checkbox";
import Cell from "../cell/cell";
import dashbordStore from '../../store/dashbord'
import OutsideAlerter from "../outsideAlerter/outsideAlerter";
import Comments from "../comments/comments";





function Position({
	id,
	isUrgent,
	settings,
	title,
	onOrderDetail,
	onPositionDetail,
	user,
	users,
	quantity,
	positionStageId,
	status,
	timestamps,
	order,
	setComment,
	comments,
	stageId,
	isCurrentStage
}) {


	const [positionRef, setPositionRef] = useState(null)
	const { setUser, setStatus } = usePosition();
	const [isVisible, setIsVisible] = useState(true);
	const [actionsPanelOpen, setActionsPanelOpen] = useState(false);
	const isSelected = dashbordStore.getIsPositionsSelected(positionStageId);
	const [active, setIsActive] = useState(false);
	const [extra, setExtra] = useState(false);

	const setInactive = useCallback(() => {
		setIsActive(false)
	}, [])

	const onSetUser = async (userId) => {
		await setUser(positionStageId, userId);
	}

	useEffect(() => {
		!extra && setActionsPanelOpen(false);
	}, [extra])

	const onSetStatus = async (statusId) => {
		await setStatus(positionStageId, statusId);
	}

	const onSelectPosition = () => {
		dashbordStore.addPosition(positionStageId)
	}

	const onPositionHandler = () => {
		setIsActive(!active)
	}

	const onSetCommentHandler = () => {
		setComment(id)
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
			positionRef.addEventListener('mouseout', outHandler)
		}
		return () => {
			document.removeEventListener('scroll', outHandler)
			if (positionRef) {
				positionRef.removeEventListener('mouseover', overHandler)
				positionRef.removeEventListener('mouseout', outHandler)
			}
		}
	}, [positionRef])

	if (!isVisible) return null;
	return (
		<OutsideAlerter
			tr={true}
			onEvent={setInactive}
			setRef={setPositionRef}
			// ref={ref => (ref)}
			className={`
				${active ? ' border-Accent/Blue ' : 'border-Content/Border'}
				hover:border-Accent/Blue position odd:bg-[#fff] even:bg-Dominant/Light flex  border mt-[-1px]`}
		>
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
					stageId={stageId}
					currentData={user}
					onSetData={onSetUser}
					isCurrentStage={isCurrentStage}
				></PositionUser>
			</Cell>
			<Cell {...settings.title} >
				<span 
				onClick={()  => onPositionDetail(id)}
				className="line-clamp-3">{title}</span>
			</Cell>
			<Cell {...settings.code} >
				<span className="">34543.34</span>
				{comments?.length > 0 &&
					<Comments comments={comments}></Comments>
				}
			</Cell>
			<Cell {...settings.quantity}>{quantity}</Cell>
			<Cell {...settings.order}>
				<span
					onClick={() => onOrderDetail(order.id)}
					className="text-Accent/Blue text-Regular(16_18) hover:cursor-pointer">
					{order.orderId}
				</span>
			</Cell>
			<Cell {...settings.status}>
				<PositionStatus
					stageId={stageId}
					isCurrentStage={isCurrentStage}
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
			<td
				style={{
					height: extra?.height + 'px',
					right: (window.innerWidth - extra?.width) / 2 + 'px',
					top: extra?.y + 'px'
				}}
				className={`
					${extra ? 'visible opacity-100 translate-x-[100%]' : 'invisible opacity-0 translate-x-[0%]'}
					border   border-Accent/Blue   top-0 fixed z-20  w-[6rem] flex items-center justify-center
				`}>
				<div
					onClick={() => setActionsPanelOpen(!actionsPanelOpen)}
					className="flex bg-white group hover:cursor-pointer p-[0.8rem]">
					<i className="icon-list group-hover:text-Accent/Blue text-Regular(18_24) text-Content/Light"></i>
				</div>
				<ul className={`
						${actionsPanelOpen ? 'visible opacity-100' : 'invisible opacity-0'}
							before:absolute
							before:left-0
							before:right-0
							before:bottom-[100%]
							before:h-[10px]
							absolute z-30 top-[calc(100%+4px)] right-0 shadow-default bg-white`
				}
				>
					<li
						onClick={onSetCommentHandler}
						className="px-[1.2rem] py-[0.9rem] ease-in-out duration-300 hover:bg-Dominant/Dop hover:cursor-pointer flex items-center gap-[0.8rem]">
						<i className="icon-comment text-Accent/Blue text-Regular(18_24)"></i>
						<span className="text-Regular(16_18)">Комментарий</span>
					</li>
				</ul>
			</td>
		</OutsideAlerter>
	);
}

export default observer(Position);