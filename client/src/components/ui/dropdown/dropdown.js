function Dropdown({ active, data, children }) {
	return (
		<div className={`
		${active ? 'duration-200 translate-y-[0%]' : 'invisible opacity-0 translate-y-[10%]'}
		ease-in-out left-0 right-0  z-10 border bg-white  top-[100%] absolute max-h-[33.5rem] overflow-auto
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