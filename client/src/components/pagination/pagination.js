function Pagination({ pageCount, page, total, onPageChange, pageSize }) {

    const pages = new Array(pageCount).fill(null);

    const onPageChangeHandler = (index) => {
        onPageChange(index + 1)
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-[1.2rem]">
                {pages.map((_, index) =>
                    <div
                        key={index}
                        onClick={() => onPageChangeHandler(index)}
                        className={`
                        ${index + 1 == page ? 'bg-[#D5E6FF] text-Accent/Blue border-[#D5E6FF]' : 'border-Content/Border'}
                        border  w-[3.8rem] h-[3.8rem] flex justify-center items-center
                    `}>{index + 1}</div>)}
            </div>
            <span>
                <span className="text-Regular(16_18) font-semibold text-Content/Dark">{page}-{pageSize}</span>
                <span className="text-Regular(16_18)  text-Content/Middle"> из </span>
                <span className="text-Regular(16_18) font-semibold text-Content/Dark">{total}</span>
            </span>

        </div>

    );
}

export default Pagination;