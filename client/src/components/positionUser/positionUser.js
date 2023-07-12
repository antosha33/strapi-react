import CellPickerHOC from "../cellPickerHOC/cellPickerHOC";
import usersStore from '../../store/users'

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
		const users = usersStore.users.filter(x =>{
			console.log(props.role)
			return x.type?.toLowerCase() === props.role?.toLowerCase();
		} );

		props.data = users
	}

	return (
		<UserCellPicker
			{...props}
		></UserCellPicker>
	);
}

export default PositionUser;