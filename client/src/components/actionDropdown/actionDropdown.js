
import dashbordStore from '../../store/dashbord'
import usePosition from '../../hooks/position.hook';
import DropdownHOC from '../dropdownHOC/dropdownHOC';


function ActionDropdown({ onEvent }) {


	const { setStagesToUrgent, setPositionsToCanceled } = usePosition();



	const finishAction = () => {
		dashbordStore.clearSelected();
		onEvent && onEvent();
	}

	const setUrgent = async () => {
		await setStagesToUrgent(dashbordStore.getSelected());
		finishAction()
	}

	const cancelPositions = async () => {
		await setPositionsToCanceled(dashbordStore.getSelected());
		finishAction()
	}


	return (
		<div className="max-w-[24rem]">

			<DropdownHOC
				items={[
					{
						onEvent: setUrgent,
						title: "Сделать позиции срочными"
					},
					{
						onEvent: cancelPositions,
						title: "Отменить позиции"
					},
					{
						onEvent: setUrgent,
						title: "Сменить ответственного"
					},
				]}
				title="Действия с выбранными"
			></DropdownHOC>
		</div>

	);
}

export default ActionDropdown;