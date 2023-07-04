import date  from "../../utils/date";

function Comment({ comments }) {
	return (
		<div className="w-[29rem] p-[1.2rem]   shadow-default bg-white text-Content/Dark">
			{comments.map(x =>
				<div className="border border-Content/Border gap-[1.2rem] border-t-0 border-l-0 border-r-0 flex flex-col py-[2rem] last:border-none first:pt-[0px] last:pb-[0]">
					<span className="text-Regular(16_18)">
						<span>{x.roleOwner} </span>
						<span className="font-medium">{x.nameOwner}</span>
					</span>
					<span className="text-Regular(16_18)">{x.comment}</span>
					<span className="text-Regular(14_16) text-Content/Middle">{date.transform(x.createdAt)}</span>
				</div>
			)}
		</div>
	);
}

export default Comment;