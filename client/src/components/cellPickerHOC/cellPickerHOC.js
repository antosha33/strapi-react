import OutsideAlerter from '../outsideAlerter/outsideAlerter'
import Dropdown from "../ui/dropdown/dropdown";
import { useEffect, useState, useRef } from "react";
import stageStore from '../../store/stage'
import usersStore from "../../store/users";

function CellPickerHOC(renderItem, Wrapped) {

	return function CellPicker({ currentData, data, onSetData, ...props }) {

		const dropdownRef = useRef(null);
		const [isDropDown, setIsDropDown] = useState(false);
		const [current, setCurrent] = useState(currentData);
		const [isDisabled, setIsDisabled] = useState(true);
		const { currentUser } = usersStore;
		const { currentStage } = stageStore;

		useEffect(() => {
			if (currentUser?.role?.toLowerCase() !== currentStage?.role?.toLowerCase()) {
				setIsDisabled(false)
				// setIsDisabled(true)
			} else {
				setIsDisabled(false)
			}
		}, [
			currentUser.role,
			currentStage.role
		])

		//не показываем выбранный элемент в дропдауне
		const filteredData = data.filter(x => x.id !== currentData?.id)

		useEffect(() => {
			setCurrent(currentData)
		}, [currentData])

		useEffect(() => {
			const scrollableDashbord = dropdownRef.current.closest('.js-scrollable-dashbord');
			const handler = () => {
				if (isDropDown) {
					setIsDropDown(false)
				}
			}
			scrollableDashbord?.addEventListener('scroll', handler)
			document.addEventListener('scroll', handler)
			return () => {
				scrollableDashbord?.removeEventListener('scroll', handler)
			}
		}, [isDropDown])

		const openDropdown = (ev) => {
			const dropdownHeight = dropdownRef.current.getBoundingClientRect().height;
			const { x, y, height, width } = ev.currentTarget.getBoundingClientRect();
			
			// let target = dropdownRef.current
			// const els = [];

			// while (target) {
			// 	els.unshift(target);
			// 	target = target.parentNode;
			// }

			// els.forEach(x => {
			// 	console.log(typeof x)
				
			// 	// console.log(els)
			// 	// if(x.style?.fixed){
			// 	// 	console.log('fixed')
			// 	// }
			// })

			let top;

			if ((window.innerHeight - (y + height)) > dropdownHeight) {
				top = y + height;
			} else {
				top = y - dropdownHeight
			}


			setIsDropDown({
				left: x,
				top,
				width
			})
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
			<OutsideAlerter
				onEvent={closeDropdown}
				className={`
					${isDisabled ? 'pointer-events-none' : 'hover:cursor-pointer'} w-[100%] flex self-stretch
				`}>
				<div
					onClick={openDropdown}
					className={`
						${isDropDown ? 'shadow-default' : ''}
						text-Regular(16_18) relative  w-[100%]
					`}>
					<Wrapped current={current} currentData={currentData} {...props}></Wrapped>
					<div
						ref={dropdownRef}
						className={`
							${isDropDown ? 'visible' : 'invisible pointer-events-none  left-0 top-0'}
							fixed z-30 min-w-[200px]
						`}

						style={{
							left: isDropDown.left,
							top: isDropDown.top,
							width: isDropDown.width
						}}
					>
						<Dropdown
							positon='static' active={!!isDropDown} data={filteredData}>
							{renderItemWithHandler}
						</Dropdown>
					</div>

				</div>
			</OutsideAlerter>


		);
	}
}

export default CellPickerHOC;