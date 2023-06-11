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
			className="flex items-center gap-[1.8rem]">
			<div
				className={`
					${isActive ? 'bg-Accent/Yellow' : 'bg-white'}
					hover:cursor-pointer hover:border-Accent/Yellow ease-in-out duration-300 w-[2rem] h-[2rem] border border-Content/Border
				`}>
			</div>
			<div className="text text-Regular(16_18)">{label}</div>
		</div>

	);
}

export default Checkbox;