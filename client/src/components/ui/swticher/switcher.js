import { useState } from "react";

function Switcher({ label, active = false, onChange }) {

	const [isActive, setIsActive] = useState(active)

	const onChangeHandler = () => {
		setIsActive(!isActive);
		onChange && onChange();
	}

	return (
		<div
			onClick={onChangeHandler}
			className="hover:cursor-pointer ease-in-out duration-300 border border-Content/Border p-[1.2rem] flex gap-[0.8rem] hover:border-Accent/Blue">
			<div
				className={`
					${isActive ? 'after:left-[1.6rem] bg-Accent/Blue' : 'after:left-[0.2rem] bg-Content/Light'}
					after:absolute
					after:ease-in-out
					after:duration-300
					after:rounded-[50%]
					after:w-[1.6rem]
					after:h-[1.6rem]
					after:top-[calc(50%-0.8rem)]
					after:left-[0.2rem]
					after:bg-white
					ease-in-out duration-300 rounded-[10rem] w-[3.4rem] h-[2rem]  relative
					`}
			></div>
			<div className={`
				${isActive ? 'text-Content/Dark' : 'text-Content/Middle'}
				text-Regular(16_18) select-none 
				`}>{label}</div>
		</div>
	);
}

export default Switcher;