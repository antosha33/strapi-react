import { useEffect, useState } from "react";

function Input({ label, password = false, icon, labelSmall = false, placeholder, initial = '', onInput, border = true }) {


	const [value, setValue] = useState(initial);
	const [inputPasswordType, setInputPasswordType] = useState('password')

	useEffect(() => {
		setValue(initial)
	}, [initial])

	const onChangeHandler = (ev) => {
		setValue(ev.target.value);
		onInput(ev)
	}

	const togglePasswordType = () => {
		if(inputPasswordType === 'text'){
			setInputPasswordType('password')
		}else{
			setInputPasswordType('text')
		}
	}

	return (
		<div className="flex flex-col items-start">
			{labelSmall ?
				<span className='block text-Regular(12_14) text-Content/Light mb-[0.6rem]'>{label}</span>
				:
				<span className="text-Content/Middle text-Regular(14_16) mb-[0.6rem]">{label}</span>
			}
			<div className="flex w-[100%] relative">
				{
					icon &&
					<i className={`${icon} absolute top-[50%] text-Content/Light left-[1.2rem] translate-y-[-50%] text-Regular(18_24)
					`}></i>
				}

				<input
					onChange={onChangeHandler}
					placeholder={placeholder}
					value={value}
					type={password ? inputPasswordType : 'text'}
					className={`
							${border ? 'border border-Content/Border' : ''}
							${icon ? 'pl-[4.8rem]' : ''}
							${password ? 'pr-[4.8rem]' : ''}
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

				{
					password &&
					<i 
						onClick={togglePasswordType}
						className={`hover:cursor-pointer icon-eye absolute top-[50%] text-Content/Light right-[1.2rem] translate-y-[-50%] text-Regular(18_24)
					`}></i>
				}
			</div>


		</div>
	);
}

export default Input;