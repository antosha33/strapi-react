function Dropdown({active,data, children}) {
	return (
		<div className={`
		${active ? 'duration-200 translate-y-[0%]' : 'invisible opacity-0 translate-y-[10%]'}
		ease-in-out left-[-1.2rem] right-[-1.2rem]  z-10 border bg-white  top-[calc(100%+1.2rem)] absolute max-h-[33.5rem] overflow-auto
	`}>
			{data.length && data.map(children)}
		</div>
	);
}

export default Dropdown;