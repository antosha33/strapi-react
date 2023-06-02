
function Cell({ children, ...props }) {

    return (
        <div className={` h-[6rem] px-[1.2rem] py-[0.9rem] border border-Content/Border border-t-0 border-l-0 border-b-0 ${props.className}`} >
            {children}
        </div>
    )
}

function Position({ title }) {
    return (
        <div className="odd:bg-[#fff] even:bg-Dominant/Light flex border border-Content/Border border-b-0 last:border-b-[1px]">
            <Cell className="w-[4.8rem]"><span></span></Cell>
            <Cell className="w-[4.8rem]"></Cell>
            <Cell className="w-[21.7rem] text-Regular(12_14)">{title}</Cell>
            <Cell className="w-[13.2rem]"></Cell>
            <Cell className="w-[17.2rem]"></Cell>
        </div>
    );
}

export default Position;