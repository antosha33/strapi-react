import React from "react";

function Cell({ flex = true, padding = true, height = 'h-[6rem]', available = true, disabled = false, children, className }) {

	if (!available) return null

	if (disabled) return (
		<td className="bg-Content/Light border border-Content/Border">
		</td>
	)

	return (
		<td
			className={`
			${padding ? 'px-[1.2rem] py-[0.9rem]' : ''}
         ${height}
			${flex ? 'flex flex-shrink-0  justify-center items-center' : ''}
			${className}
			`} >
			{children}
		</td>
	)
}
export default React.memo(Cell);