import { useEffect } from "react";


import useTimer from '../../hooks/timer.hook';

import CellPickerHOC from "../cellPickerHOC/cellPickerHOC";


const renderItem = (onClickHandler) => (item) =>
	<span
		onClick={() => onClickHandler(item)}
		style={{
			background: item.color
		}}
		key={item.id} className="block px-[1.2rem] py-[1.2rem]">{item.title}
	</span>;

const Cell = ({ current, currentData, setIsVisible, timestamps = '{}' }) => {

	const { changeTime} = JSON.parse(timestamps) || {};

	const { start, clear, value } = useTimer({
		onFinish: () => setIsVisible(false)
	})

	useEffect(() => {
		if (current.stageTrigger) {
			const diff = ((changeTime - new Date().getTime())/1000) > 0 ? Math.ceil((changeTime - new Date().getTime())/1000) : 0
			start(diff || current.triggerTimeout)
		}
		return () => {
			clear()
		}
	}, [current.stageTrigger, changeTime])

	return current ?
		<div
			style={{ background: current.color }}
			className=" flex h-[100%] gap-[0.8rem] justify-between">
			<div className="px-[1.2rem] py-[0.9rem] h-[100%]">
				{current?.title || currentData.title}
			</div>
			{
				current.stageTrigger && <span className='p-[0.3rem]'>{value}</span>
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