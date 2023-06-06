import CellPickerHOC from "../cellPickerHOC/cellPickerHOC";


const Cell = ({ current, currentData }) => {
	return current ?
		<div className="px-[1.2rem] py-[0.9rem] h-[100%]">{current?.username || currentData.username}</div> :
		<div className="text-Accent/Red font-medium px-[1.2rem] py-[0.9rem] h-[100%]">Выбрать ответственного</div>
}

const renderItem = (onClickHandler) => (item) =>
<span
	onClick={() => onClickHandler(item)}
	key={item.id} className="block px-[1.2rem] py-[1.2rem]">{item.username}
</span>;

const UserCellPicker = CellPickerHOC(renderItem, Cell)


function PositionUser({ onSetUserHandler, ...props }) {

	return (
		<UserCellPicker
			{...props}
		></UserCellPicker>
	);
}

export default PositionUser;