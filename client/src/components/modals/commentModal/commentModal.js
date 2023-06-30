import { useEffect, useRef, useState } from "react";
import useOrder from "../../../hooks/order.hook";
import Cell from "../../cell/cell";
import stageStore from "../../../store/stage";
import DefaultModal from "../defaultModal/defaultModal";
import Button from "../../ui/button/button";
import usePosition from "../../../hooks/position.hook";
import usersStore from '../../../store/users'

function CommentModal({ positionStageId, setCommentModal }) {

    const textareaRef = useRef(null)
    const { setComment } = usePosition();
    const { currentUser} = usersStore;
    const { currentStage} = stageStore;

    const onCommentHandler = () => {

        if(!textareaRef.current.value) {
            return;
        }

        setComment({
            roleOwner: currentUser.role,
            nameOwner: currentUser.username,
            'c_position_stage': positionStageId,
            comment: textareaRef.current.value
        })

        setCommentModal(false);
    }


    return (
        <div className="w-[90vw] max-w-[76rem] min-h-[10rem]">
            <DefaultModal>
                <div className="flex flex-col gap-[2.4rem]">
                    <textarea ref={textareaRef} className="p-[1.2rem] text-Regular(16_20) border w-[100%] border-Content/Border rounded-[4px] min-h-[14rem]" />
                    <div className="flex gap-[1.8rem]">
                        {currentStage.suggests.map(x => <span className="text-Content/Middle text-Regular(14_16)">{x.suggest}</span>)}
                    </div>
                    <Button
                        onPress={onCommentHandler}
                        name="Отправить">
                    </Button>
                </div>
            </DefaultModal>

        </div>
    );
}

export default CommentModal;