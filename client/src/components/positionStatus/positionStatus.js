import { useEffect, useRef, useState } from "react";


import useTimer from '../../hooks/timer.hook';

import CellPickerHOC from "../cellPickerHOC/cellPickerHOC";


const renderItem = (onClickHandler) => (item) =>
	<span
		onClick={(ev) => { ev.stopPropagation(); onClickHandler(item) }}
		key={item.id} className="hover:opacity-60 ease-in-out duration-300 block px-[1.2rem] py-[1.2rem]">{item.title}
	</span>;

const Cell = ({ current, currentData, setIsVisible, timestamps = '{}' }) => {

	const prevStatusRef = useRef(current.stageTrigger);
	const showTimer  = prevStatusRef.current !== current.stageTrigger;

	const { changeTime } = JSON.parse(timestamps) || {};

	const { start, clear, value } = useTimer({
		onFinish: () => setIsVisible && setIsVisible(false)
	})

	useEffect(() => {
		if (current?.stageTrigger) {
			const diff = ((changeTime - new Date().getTime()) / 1000) > 0 ? Math.ceil((changeTime - new Date().getTime()) / 1000) : 0
			start(diff || current.triggerTimeout)
		}
		return () => {
			clear()
		}
	}, [current?.stageTrigger, changeTime])

	return current ?
		<div
			style={{ background: current.color }}
			className=" flex h-[100%] gap-[0.8rem] justify-between w-[100%]">
			<div className="px-[1.2rem] py-[0.9rem] h-[100%]">
				{current?.title || currentData.title}
			</div>
			{
				current?.stageTrigger  && (changeTime || showTimer) &&
				<div className="relative p-[0.4rem]">
					<i className="icon-ready text-Accent/Blue text-[2.4rem] ">
					</i>
					<span className='absolute right-[0.9rem] top-[1.3rem] text-Accent/Blue text-[1.2rem]'>{value}</span>
				</div>

			}
		</div>
		:
		<div className="text-Accent/Red font-medium">Статус?</div>
}

const PositonCellPicker = CellPickerHOC(renderItem, Cell)

function PositionStatus({ ...props }) {
	return (
		<PositonCellPicker
			{...props}
		></PositonCellPicker>
	);
}

export default PositionStatus;