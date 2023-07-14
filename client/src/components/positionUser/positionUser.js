import CellPickerHOC from "../cellPickerHOC/cellPickerHOC";
import usersStore from '../../store/users'
import stageStore from '../../store/stage'

const Cell = ({ current, currentData }) => {
	return current ?
		<div className="px-[1.2rem] py-[0.9rem] h-[100%]">{current?.username || currentData.username}</div> :
		<div className="text-Accent/Red font-medium px-[1.2rem] py-[0.9rem] h-[100%]">Выбрать ответственного</div>
}

const renderItem = (onClickHandler) => (item) =>
	<span
		onClick={(ev) => { ev.stopPropagation(); onClickHandler(item) }}
		key={item.id} className="hover:opacity-60 ease-in-out duration-300 block px-[1.2rem] py-[1.2rem]">{item.username}
	</span>;

const UserCellPicker = CellPickerHOC(renderItem, Cell)


function PositionUser({ onSetUserHandler, ...props }) {

	if (!props.data) {
		const role = stageStore.stages.find(x => x.id === props.stageId)?.m_role;
		const users = usersStore.users.filter(x => x.m_roles.find(y => y.id === role?.id));
		props.data = users
	}

	return (
		<UserCellPicker
			{...props}
		></UserCellPicker>
	);
}

export default PositionUser;