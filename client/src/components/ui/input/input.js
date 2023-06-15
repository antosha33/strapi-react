import { useEffect, useState } from "react";

function Input({ label, labelSmall = false, placeholder, initial = '', onInput, border = true }) {


	const [value, setValue] = useState(initial);

	useEffect(() => {
		setValue(initial)
	}, [initial])

	const onChangeHandler = (ev) => {
		setValue(ev.target.value);
		onInput(ev)
	}

	return (
		<div className="flex flex-col items-start">
			{labelSmall ?
				<span className='block text-Regular(12_14) text-Content/Light mb-[0.6rem]'>{label}</span>
				:
				<span className="text-Content/Middle text-Regular(14_16) mb-[0.6rem]">{label}</span>
			}

			<input
				onChange={onChangeHandler}
				placeholder={placeholder}
				value={value}
				className={`
							${border ? 'border border-Content/Border' : ''}
                    px-[1.2rem]
                    py-[1.7rem]
                    block
                    w-[100%]
                    bg-Dominant/Main
                    text-Regular(16_18)
                    text-Content/Dark
                    placeholder:text-Regular(16_18)
                    placeholder:text-Content/Middle

                    focus:border-Accent/Blue
                    focus:outline-0
                `}
			></input>
		</div>
	);
}

export default Input;