import OutsideAlerter from '../outsideAlerter/outsideAlerter'
import Dropdown from "../ui/dropdown/dropdown";
import { useEffect, useState } from "react";

function CellPickerHOC(renderItem, Wrapped) {

	return function CellPicker({ currentData, data, onSetData, ...props }) {

		const [isDropDown, setIsDropDown] = useState(false);
		const [current, setCurrent] = useState(currentData);

		//не показываем выбранный элемент в дропдауне
		const filteredData = data.filter(x => x.id !== currentData?.id)

		useEffect(() => {
			setCurrent(currentData)
		}, [currentData])

		const openDropdown = () => {
			setIsDropDown(true)
		}

		const closeDropdown = () => {
			setIsDropDown(false)
		}

		const onChooseHanlder = (user) => {
			setIsDropDown(false)
			setCurrent(user);
			onSetData(user.id);
		}

		const renderItemWithHandler = renderItem(onChooseHanlder)


		return (
			<OutsideAlerter onEvent={closeDropdown} className="w-[100%] flex self-stretch">
				<div
					onClick={openDropdown}
					className=" text-Regular(16_18) relative  w-[100%]">
					<Wrapped current={current} currentData={currentData} {...props}></Wrapped>
					<Dropdown active={isDropDown} data={filteredData}>
						{renderItemWithHandler}
					</Dropdown>
				</div>
			</OutsideAlerter>


		);
	}
}

export default CellPickerHOC;