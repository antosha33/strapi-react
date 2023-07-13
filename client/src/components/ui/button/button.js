function Button({ name, onPress }) {
	return (
		<div
			onClick={onPress}
			className="inline-block py-[1.1rem] group px-[1.8rem]  hover:cursor-pointer  font-medium rounded-[8px] bg-Accent/Yellow text-Content/Dark text-Regular(16_20)">
			<span className="flex group-hover:text-Content/Middle text-Content/Dark ease-in-out duration-300 items-center gap-[0.8rem]">
				<span>{name}</span>
				<i className="icon-arrow-right text-Regular(18_24)"></i>
			</span>

		</div>
	);
}

export default Button;