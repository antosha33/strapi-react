import { useCallback, useState } from 'react';
import OutsideAlerter from '../outsideAlerter/outsideAlerter'
import Dropdown from '../ui/dropdown/dropdown';


function DropdownHOC({ title, items }) {

	const [isOpen, setIsOpen] = useState(false);

	const closeDropdown = useCallback(() => {
		setIsOpen(false);
	},[])

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	}


	const renderItem = ({ onEvent, title, color }) => {
		return (
			<span
				key={title}
				onClick={() => {
					onEvent();
					closeDropdown()
				}}
				className="hover:bg-Content/Border ease-in-out duration-300 hover:cursor-pointer block px-[1.2rem] py-[1.2rem] text-Regular(16_18) flex gap-[0.8rem] items-center">
				{color && <span
					style={{background: color}}
					className={`w-[1.4rem] h-[1.4rem] rounded-[50%]`}></span>}
				<span>
					{title}
				</span>
			</span>
		)
	}

	return (
		<OutsideAlerter onEvent={closeDropdown} className="flex self-stretch">
			<div className='relative w-[100%]'>
				<div
					onClick={toggleDropdown}
					className="hover:cursor-pointer hover:border-Accent/Blue ease-in-out duration-300 border border-Content/Border p-[1.2rem] text-Regular(16_18) flex gap-[0.8rem] justify-between">
					<span className='whitespace-nowrap'>{title}</span>
					<i className={`icon-arrow ease-in-out duration-300
						${isOpen ? 'text-Accent/Blue rotate-180' : 'text-Content/Middle'}
						`} style={{ fontSize: "1.4rem" }} />
				</div>
				<Dropdown active={isOpen} data={items}>
					{renderItem}
				</Dropdown>
			</div>

		</OutsideAlerter>
	)

}

export default DropdownHOC;