function Cell({flex=true, padding = true, height = 'h-[6rem]', available = true, children, ...props }) {

	if (!available) return null

	return (
		<td
			className={`
			${padding ? 'px-[1.2rem] py-[0.9rem]' : 'p-[0px]'}
         ${height}
			${flex ? 'flex flex-shrink-0  justify-center items-center' : ''}
			${props.className}
			`} >
			{children}
		</td>
	)
}
export default Cell;