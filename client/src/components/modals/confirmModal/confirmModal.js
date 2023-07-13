
import DefaultModal from "../defaultModal/defaultModal";
import ButtonResolve from "../../ui/buttonResolve/buttonResolve";
import ButtonReject from "../../ui/buttonReject/buttonReject";

function ConfirmModal({ onResolve, onReject }) {


	return (
		<div className="w-[62rem] min-h-[10rem]">
			<DefaultModal>
				<div className="flex flex-col gap-[5rem]">
					<span className="text-Regular(18_24) text-center">Вы уверены, что хотите выйти из профиля?</span>
					<div className="flex justify-center gap-[5rem]">
						<ButtonResolve
							onPress={onResolve}
							name='Да'
						></ButtonResolve>
						<ButtonReject
							onPress={onReject}
							name='Нет'
						></ButtonReject>
					</div>

				</div>
			</DefaultModal>
		</div>
	);
}

export default ConfirmModal;