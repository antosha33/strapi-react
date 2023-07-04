function Button({ name, onPress }) {
	return (
		<div
			onClick={onPress}
			className="py-[1.1rem] group px-[1.8rem]  font-medium rounded-[8px] bg-Accent/Yellow text-Content/Dark text-Regular(16_20)">
			<span className="flex group-hover:opacity-25 items-center gap-[0.8rem]">
				<span>{name}</span>
				<i className="icon-arrow-right text-Regular(18_24)"></i>
			</span>

		</div>
	);
}

export default Button;