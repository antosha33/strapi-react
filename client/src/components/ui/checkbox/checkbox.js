import { useEffect, useState } from "react";


function Checkbox({ label, active = false, onChange }) {

	const [isActive, setIsActive] = useState(active);

	useEffect(() => {
		setIsActive(active)
	}, [active])


	const onChangeHandler = () => {
		setIsActive(!isActive);
		onChange && onChange();
	}

	return (
		<div
			onClick={onChangeHandler}
			className={`
				${label ? 'px-[1.2rem] py-[0.9rem]' : ''}
				 flex items-center gap-[0.8rem] group hover:cursor-pointer hover:bg-Dominant/Dop ease-in-out duration-300`}>
			<div
				className={`
					${isActive ? 'bg-Accent/Yellow' : 'bg-white'}
					flex items-center justify-center
					 group-hover:border-Accent/Yellow ease-in-out duration-300 w-[2rem] h-[2rem] border border-Content/Border
				`}>
				{isActive && <i className="icon-mark before:!font-bold"></i>}

			</div>
			{label && <div className="text text-Regular(16_18)">{label}</div>}
		</div>

	);
}

export default Checkbox;