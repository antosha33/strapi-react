
import { useCallback, useState } from 'react';
import { Tooltip } from 'react-tooltip'
import Comment from "../comment/comment";
import OutsideAlerter from '../outsideAlerter/outsideAlerter'


function Comments({ comments }) {

	const [isOpen, setIsOpen] = useState(false);
	const closeComments = useCallback(() => {
		setIsOpen(false)
	}, [])

	return (
		<OutsideAlerter
			onEvent={closeComments}
			className="absolute right-[3px] top-[3px] flex items-center justify-center"
		>
			<i
				onClick={() => setIsOpen(true)}
				data-tooltip-id={'my-tooltip'}
				className="text-Regular(14_16) hover:cursor-pointer icon-comment text-Accent/Blue_Light"></i>
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
	);
}

export default Comments;