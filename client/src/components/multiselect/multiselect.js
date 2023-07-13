import { useEffect, useState } from 'react';
import OutsideAlerter from '../outsideAlerter/outsideAlerter'
import Dropdown from '../ui/dropdown/dropdown';
import Checkbox from '../ui/checkbox/checkbox';


const PREVIEW_COUNT = 2;

function Multiselect({ onEvent, items, placeholder, label, current }) {


	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState([]);

	

	useEffect(() => {
		setSelected(current?.val || [])
	}, [current])


	useEffect(() => {
		onEvent && onEvent(selected);
	}, [selected, onEvent])

	const closeDropdown = () => {
		setIsOpen(false);
	}

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	}


	const renderItem = ({ id, title, username }) => {
		const isActive = selected.findIndex(x => x.id === id) > -1;
		const onChooseHandler = () => {
			if (selected.findIndex(x => x.id === id) > -1) {
				const filtered = selected.filter(x => x.id !== id);
				setSelected(filtered)
			} else {
				setSelected(prev => {
					return [...prev, { id, title: title || username, label }]
				})
			};
		}
		return (
			<div key={id} className="block ">
				<Checkbox
					active={isActive}
					onChange={onChooseHandler}
					label={title || username}
				></Checkbox>
			</div>
		)
	}

	const onRemoveHandler = (id) => {
		const filtered = selected.filter(x => x.id !== id);
		setSelected(filtered)
	}


	return (
		<OutsideAlerter onEvent={closeDropdown} className="flex self-stretch">
			<div className='relative w-[100%]'>

				{label && <span className='block text-Regular(12_14) text-Content/Light mb-[0.6rem]'>{label}</span>}
				<div
					onClick={toggleDropdown}
					className="items-center hover:cursor-pointer hover:border-Accent/Blue ease-in-out duration-300 border border-Content/Border px-[1.2rem] h-[5rem] text-Regular(16_18) flex gap-[0.8rem] justify-between">
					{selected.length ?
						<div className="flex gap-[0.6rem] overflow-auto flex items-center ">
							{selected.map((x, index) => {
								if (index + 1 > PREVIEW_COUNT) return null
								return (
									<div
										onClick={(ev) => ev.stopPropagation()}
										key={x.id}
										className="max-w-[20rem] px-[0.7rem] h-[3.2rem] text-Regular(16_18) flex gap-[0.6rem]  items-center whitespace-nowrap bg-[#BDDAF6]">
										<span className=' overflow-hidden text-ellipsis inline-block'>
											{x.title}
										</span>
										<i
											className='icon-close text-[1.6rem]'
											onClick={() => { onRemoveHandler(x.id) }}
										></i>
									</div>
								)
							}
							)}
							{selected.length > 2 &&
								<div className="max-w-[20rem] px-[0.7rem] h-[3.2rem] text-Regular(16_18) flex gap-[0.6rem]  items-center whitespace-nowrap bg-[#BDDAF6]">
									+еще {selected.length - PREVIEW_COUNT}
								</div>
							}
						</div>
						:
						<span className='text-Content/Middle'>{placeholder}</span>
					}

					<i className={`icon-arrow ease-in-out duration-300
						${isOpen ? 'text-Accent/Blue rotate-180' : 'text-Content/Middle'}
						`} style={{ fontSize: "1.4rem" }} />
				</div>
				<Dropdown active={isOpen} data={items}>
					{renderItem}
				</Dropdown>
			</div>

		</OutsideAlerter >
	)

}

export default Multiselect;