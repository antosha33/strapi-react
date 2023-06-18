function Dropdown({ active, data, children, positon="top-[100%] absolute"}) {
	return (
		<div className={`
		${positon}
		${active ? 'duration-200 translate-y-[0%]' : 'invisible opacity-0 translate-y-[10%]'}
		shadow-default ease-in-out left-0 right-0  z-10  bg-white   max-h-[33.5rem] overflow-auto
	`}>
			{data?.length ?
				data.map(children)
				:
				children
			}
		</div>
	);
}

export default Dropdown;