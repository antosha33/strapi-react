function ButtonReject({ name, onPress }) {
	return (
		<div
			onClick={onPress}
			className="hover:bg-Accent/Red_Middle hover:cursor-pointer duration-300 ease-in-out min-w-[19rem] py-[1.1rem] group px-[1.8rem]  font-medium rounded-[8px] bg-Accent/Red text-white text-Regular(16_20)">
			<span className="flex justify-center  items-center gap-[0.8rem]">
				<span>{name}</span>
				<i className="icon-times-circle text-Regular(18_24)"></i>
			</span>

		</div>
	);
}

export default ButtonReject;