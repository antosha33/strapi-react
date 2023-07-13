import { useCallback, useEffect,  } from "react";

import useTimer from '../../hooks/timer.hook';
import stageStore from '../../store/stage'
import CellPickerHOC from "../cellPickerHOC/cellPickerHOC";


const renderItem = (onClickHandler) => (item) =>
	<span
		onClick={(ev) => { ev.stopPropagation(); onClickHandler(item) }}
		key={item.id} className="hover:opacity-60 ease-in-out duration-300 block px-[1.2rem] py-[1.2rem]">{item.title}
	</span>;

const Cell = ({ current, currentData, setIsVisible, timestamps = '{}', small }) => {

	const { changeTime } = JSON.parse(timestamps) || {};

	const onTimerFinish = useCallback(() => {
		setIsVisible && setIsVisible(false);
	}, [setIsVisible])

	const { start, clear, value, isFinished } = useTimer({
		onFinish: onTimerFinish
	})


	useEffect(() => {
		if (current?.stageTrigger) {
			const diff = ((changeTime - new Date().getTime()) / 1000) > 0 ? Math.ceil((changeTime - new Date().getTime()) / 1000) : 0;
			if (changeTime && changeTime < new Date().getTime()) return;
			start(diff || current.triggerTimeout);
		} else {
			clear();
		}
		return () => {
			clear()
		}
	}, [current?.stageTrigger, changeTime, current.triggerTimeout, clear, start])

	return current ?
		<div

			style={{ background: current.color }}
			className="flex h-[100%] gap-[0.8rem] justify-between w-[100%]">
			<div className={`
				${small ? 'overflow-hidden text-ellipsis whitespace-nowrap' : ''}
				px-[1.2rem] py-[0.9rem] h-[100%]`}>
				{current?.title || currentData?.title}
			</div>
			{
				!isFinished && !!value &&
				<div className="relative p-[0.4rem]">
					<i className={`
							 icon-ready text-Accent/Blue
							${small ? 'text-[2rem]' : 'text-[2.4rem]'}
						`}>
					</i>
					<span className={`
						absolute right-[0.9rem] top-[1.3rem] text-Accent/Blue 
						${small ? 'text-[1rem]' : 'text-[1.2rem]'} 
						`}>{value}</span>
				</div>

			}
		</div>
		:
		<div className="text-Accent/Red font-medium">Статус?</div>
}

const PositonCellPicker = CellPickerHOC(renderItem, Cell)

function PositionStatus({ ...props }) {
	if (!props.data) {
		const stage = stageStore.stages.find(x => x.statuses.find(y => y.id === props?.currentData?.id));
		if (!stage) {
			return null
		} else {
			props.data = stage.statuses
		}
	}
	return (
		<PositonCellPicker
			{...props}
		></PositonCellPicker>
	);
}

export default PositionStatus;