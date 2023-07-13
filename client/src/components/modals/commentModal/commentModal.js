import { useRef, useState } from "react";
import DropdownHOC from "../../dropdownHOC/dropdownHOC";
import stageStore from "../../../store/stage";
import DefaultModal from "../defaultModal/defaultModal";
import Button from "../../ui/button/button";
import usePosition from "../../../hooks/position.hook";
import usersStore from '../../../store/users'
import ButtonBorder from "../../ui/buttonBorder/buttonBorder";
import Checkbox from '../../ui/checkbox/checkbox'

function CommentModal({ positionId, setCommentModal }) {

	const textareaRef = useRef(null)
	const [urgentStage, setUrgentStage] = useState(false);
	const { setComment } = usePosition();
	const { currentUser: { role: { name }, username } } = usersStore;
	const { currentStage, stages } = stageStore;
	const [stage, setStage] = useState(currentStage)


	const dropdownItems = stages.map(x => ({
		onEvent: () => setStage(x),
		title: x.title
	}))

	const onCommentHandler = async () => {
		if (!textareaRef.current.value) {
			return;
		}
		await setComment({
			roleOwner: name,
			nameOwner: username,
			positionId: positionId,
			stageId: stage.id,
			comment: textareaRef.current.value,
			urgentStage
		})
		setCommentModal();
	}

	const onSuggestHandler = (suggest) => {
		textareaRef.current.value = suggest
	}




	return (
		<div className="w-[90vw] max-w-[76rem] min-h-[10rem]">
			<DefaultModal>
				<div className="flex gap-[1.8rem] items-center mb-[1.6rem]">
					<span className="text-Regular(18_24)">Отправить комментарий на этап</span>
					<div className="min-w-[20rem]">
						<DropdownHOC
							items={dropdownItems}
							title={stage.title}
						></DropdownHOC>
					</div>

				</div>
				<div className="flex flex-col gap-[2.4rem]">
					<textarea ref={textareaRef} className="p-[1.2rem] text-Regular(16_20) border w-[100%] border-Content/Border rounded-[4px] min-h-[14rem]" />
					{
						!!stage.suggests.length &&
						<div className="flex gap-[1.8rem]">
							{stage.suggests?.map(x =>
								<ButtonBorder
									key={x.id}
									onPress={() => onSuggestHandler(x.suggest)}
									name={x.suggest}
								></ButtonBorder>
							)}
						</div>
					}

					<div className="flex justify-start">
						<Checkbox
							onChange={() => setUrgentStage(!urgentStage)}
							label="Сделать этап срочным"
						></Checkbox>
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