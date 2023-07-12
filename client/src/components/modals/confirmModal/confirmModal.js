
import DefaultModal from "../defaultModal/defaultModal";
import Button from "../../ui/button/button";

function ConfirmModal({ onResolve }) {


	return (
		<div className="w-[62rem] min-h-[10rem]">
			<DefaultModal>
				<div className="flex flex-col gap-[10rem]">
					<span className="text-Regular(18_24) text-center">Вы уверены, что хотите выйти из профиля?</span>
					<Button
						onPress={onResolve}
						name='Да'
					></Button>
				</div>
			</DefaultModal>
		</div>
	);
}

export default ConfirmModal;