import UserStageDropdown from "../userStageDropdown/userStageDropdown";


const settings = [{
	user: {
		available: true,
		title: 'Ответственный'
	},
	code: {
		available: true,
		title: 'Ответственный'
	},
	title: {
		available: true,
		title: 'Назв-е товара'
	},
	qauntity: {
		available: true,
		title: 'Кол-во'
	}
}]


function Cell({ children, ...props }) {

	return (
		<div className={` h-[6rem] px-[1.2rem] py-[0.9rem] flex border border-Content/Border border-t-0 border-l-0 border-b-0 ${props.className}`} >
			{children}
		</div>
	)
}

function Position({ title, user, users }) {


	return (
		<div className="odd:bg-[#fff] even:bg-Dominant/Light flex border border-Content/Border border-b-0 last:border-b-[1px]">
			<Cell className="w-[4.8rem]"></Cell>
			<Cell className="w-[16rem] relative">
				<UserStageDropdown users={users} currentUser={user}></UserStageDropdown>
			</Cell>
			<Cell className="w-[21.7rem] text-Regular(12_14)">{title}</Cell>
			<Cell className="w-[13.2rem]"></Cell>
			<Cell className="w-[17.2rem]"></Cell>
		</div>
	);
}

export default Position;