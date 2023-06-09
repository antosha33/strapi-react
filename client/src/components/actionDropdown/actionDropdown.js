import { useState } from 'react';
import OutsideAlerter from '../outsideAlerter/outsideAlerter'
import dashbordStore from '../../store/dashbord'
import usePosition from '../../hooks/position.hook';
import DropdownHOC from '../dropdownHOC/dropdownHOC';


function DropdownItem({ title, onClick }) {
	return (
		<div
			onClick={onClick}
			className="p-[1.2rem] text-Regular(16_18)">{title}</div>
	)
}

function ActionDropdown({ onEvent }) {


	const { setPositionsToUrgent } = usePosition();



	const finishAction = () => {
		dashbordStore.clearSelected();
		// setIsOpen(false);
		onEvent && onEvent();
	}

	const setUrgent = async () => {
		console.log('here')
		await setPositionsToUrgent(dashbordStore.getSelected());
		finishAction()
	}


	return (
		<DropdownHOC
			items={[
				{
					onEvent: setUrgent,
					title: "Сделать позиции срочными"
				},
				{
					onEvent: setUrgent,
					title: "Отменить позиции"
				},
				{
					onEvent: setUrgent,
					title: "Сменить ответственного"
				},
			]}
			title="Действия с выбранными"
		></DropdownHOC>
	);
}

export default ActionDropdown;