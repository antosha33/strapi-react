function ButtonResolve({ name, onPress }) {
	return (
		<div
			onClick={onPress}
			className="hover:bg-Accent/Light_Green hover:cursor-pointer duration-300 ease-in-out min-w-[19rem] py-[1.1rem] group px-[1.8rem]  font-medium rounded-[8px] bg-Accent/Green text-white text-Regular(16_20)">
			<span className="flex justify-center  items-center gap-[0.8rem]">
				<span>{name}</span>
				<i className="icon-fcheck-circle text-Regular(18_24)"></i>
			</span>

		</div>
	);
}

export default ButtonResolve;