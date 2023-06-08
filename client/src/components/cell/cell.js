function Cell({ padding = true, height = 'h-[6rem]', available = true, children, ...props }) {

    if (!available) return null

    return (
        <div className={`
			${padding ? 'px-[1.2rem] py-[0.9rem]' : ''}
            ${height}
			 flex justify-center items-center border border-Content/Border border-t-0 border-l-0 border-b-0 ${props.className}
			`} >
            {children}
        </div>
    )
}
export default Cell;