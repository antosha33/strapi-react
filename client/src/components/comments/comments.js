
import { useState } from 'react';
import { Tooltip } from 'react-tooltip'
import Comment from "../comment/comment";
import OutsideAlerter from '../outsideAlerter/outsideAlerter'


function Comments({ comments }) {

	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className="absolute right-0 top-0">
			<OutsideAlerter
				onEvent={() => setIsOpen(false)}
			>
				<i
					onClick={() => setIsOpen(true)}
					data-tooltip-id={'my-tooltip'}
					className="hover:cursor-pointer icon-comment text-Accent/Blue_Light"></i>
				<div className="absolute z-30 left-[100%] bottom-[100%]">
					<Tooltip
						className="comment-tooltip"
						isOpen={isOpen}
						openOnClick={true}
						opacity="1"
						style={{
							backgroundColor: "#fff",
							padding: 0,
							boxShadow: 'none',

						}}
						id={'my-tooltip'} >
						<Comment comments={comments}></Comment>
					</Tooltip>
				</div>
			</OutsideAlerter>

		</div>
	);
}

export default Comments;