import { useEffect, useRef, useState } from "react";
import useOrder from "../../../hooks/order.hook";
import Cell from "../../cell/cell";
import stageStore from "../../../store/stage";
import DefaultModal from "../defaultModal/defaultModal";
import Button from "../../ui/button/button";
import usePosition from "../../../hooks/position.hook";
import usersStore from '../../../store/users'
import ButtonBorder from "../../ui/buttonBorder/buttonBorder";

function CommentModal({ positionStageId, setCommentModal }) {

	const textareaRef = useRef(null)
	const { setComment } = usePosition();
	const { currentUser } = usersStore;
	const { currentStage } = stageStore;

	const onCommentHandler = async() => {
		if (!textareaRef.current.value) {
			return;
		}
		await setComment({
			roleOwner: currentUser.role.name,
			nameOwner: currentUser.username,
			'c_position_stage': positionStageId,
			comment: textareaRef.current.value
		})
		setCommentModal();
	}

	const onSuggestHandler = (suggest) => {
		textareaRef.current.value = suggest
	}


	return (
		<div className="w-[90vw] max-w-[76rem] min-h-[10rem]">
			<DefaultModal>
				<div className="flex flex-col gap-[2.4rem]">
					<textarea ref={textareaRef} className="p-[1.2rem] text-Regular(16_20) border w-[100%] border-Content/Border rounded-[4px] min-h-[14rem]" />
					<div className="flex gap-[1.8rem]">
						{currentStage.suggests?.map(x =>
							<ButtonBorder
								key={x.id}
								onPress={() => onSuggestHandler(x.suggest)}
								name={x.suggest}
							></ButtonBorder>
						)}
					</div>
					<div className="self-end">
						<Button
							onPress={onCommentHandler}
							name="Отправить">
						</Button>
					</div>

				</div>
			</DefaultModal>

		</div>
	);
}

export default CommentModal;