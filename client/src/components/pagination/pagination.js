function Pagination({ pageCount, page, total, onPageChange, pageSize }) {

	const pages = new Array(pageCount).fill(null);

	const onPageChangeHandler = (index) => {
		onPageChange(index + 1)
	}

	return (
		<div className="flex items-center justify-between">
			<div className="flex gap-[1.2rem] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
				{pages.map((_, index) =>
					<div
						key={index}
						onClick={() => onPageChangeHandler(index)}
						className={`
                        ${index + 1 === page ? 'bg-[#D5E6FF] text-Accent/Blue border-[#D5E6FF] pointer-events-none' : 'border-Content/Border'}
                        hover:cursor-pointer hover:border-Accent/Blue ease-in-out duration-300 border  w-[3.8rem] h-[3.8rem] flex justify-center items-center
                    `}>
						<span className="text-Content/Middle text-Regular(14_16)">
							{index + 1}
						</span>

					</div>)}
			</div>
			<span className="ml-[auto]">
				<span className="text-Regular(16_18) font-semibold text-Content/Dark">{page}-{pageSize}</span>
				<span className="text-Regular(16_18)  text-Content/Middle"> из </span>
				<span className="text-Regular(16_18) font-semibold text-Content/Dark">{total}</span>
			</span>

		</div>

	);
}

export default Pagination;