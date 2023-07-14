import { useEffect, useState, useRef, useCallback } from "react";

import { date } from "../../../utils/date";
import useOrder from "../../../hooks/order.hook";
import Loader from "../../loader/loader";
import Cell from '../../cell/cell';
import stageStore from "../../../store/stage";
import PositionStatus from "../../positionStatus/positionStatus";
import PositionUser from "../../positionUser/positionUser";
import Comments from "../../comments/comments";
import usePosition from "../../../hooks/position.hook";
import ButtonBorder from "../../ui/buttonSimple/buttonSimple";


const Th = ({ name, className }) => {
	return (
		<div className={`${className} flex-auto flex bg-Dominant/Light  justify-center items-center p-[1.2rem] border border-Content/Border border-l-0 border-r-0 border-t-0`}>
			<span className="text-Regular(12_14) font-semibold">{name}</span>
		</div>
	)


}

function PositionModal({ positionId, setCommentModal }) {


	const intervalId = useRef(null);
	const { getPosition } = usePosition()
	const { setUser, setStatus } = usePosition();
	const { stages } = stageStore;
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);

	const getData = useCallback(async () => {

		if (!positionId) return;

		setLoading(true)

		const { data } = await getPosition({
			positionId,
		})

		setData(data);
		setLoading(false);


	}, [getPosition])

	useEffect(() => {
		getData()
		intervalId.current = setInterval(getData, 5000);
		return () => {
			clearInterval(intervalId.current)
		}
	}, [getData])

	const onSetStatus = (positionStageId) => async (statusId) => {
		await setStatus(positionStageId, statusId);
	}

	const onSetUser = (positionStageId) => async (userId) => {
		await setUser(positionStageId, userId);
	}




	return (
		<div className="w-[90vw] max-w-[180rem] min-h-[50rem]">
			{loading && !data && <Loader></Loader>}
			{data &&
				<>
					<div className="py-[3.6rem] px-[11rem] bg-Accent/Light_Yellow">
						<div className="grid grid-cols-5 gap-[2.6rem] mb-[2.4rem]">
							<div className="flex gap-[0.5rem]">
								<span className="block text-Regular(16_20)">Заказ:</span>
								<span className="block text-Regular(16_20) font-bold">№{data.order.id}</span>
							</div>
						</div>
					</div>
				</>
			}
			<div className="py-[3.6rem] px-[11rem] ">
				<div className="flex flex-col gap-[2.6rem]">
					{data?.c_position_stages.map(x => {
						return (
							<div className="flex flex-col gap-[0.8rem]">
								<span style={{ backgroundColor: x.stage.color }} className="py-[0.9rem] px-[1.2rem] self-start text-Regular(16_18) font-semibold">{x.stage.title}</span>
								<table >
									<tbody>
										<tr>
											<td className="w-[27rem] border-collapse border border-Content/Border align-top">
												<Th
													name="Ответственный"
												>
												</Th>
												<div className="min-h-[8rem] p-[1.2rem]">
													<PositionUser
														small={true}
														stageId={x.stage.id}
														currentData={x.user}
														onSetData={onSetUser(x.id)}
														isCurrentStage={x.isCurrentStage}
													></PositionUser>
												</div>
											</td>
											<td className="w-[27rem] border-collapse border border-Content/Border align-top">
												<Th
													name="Текущий статус"
												>
												</Th>
												<div className="min-h-[8rem] p-[1.2rem]">
													<PositionStatus
														className="text-Regular(12_14)"
														currentData={x.status}
														stageId={x.stage.id}
														small={true}
														isCurrentStage={x.isCurrentStage}
														onSetData={onSetStatus(x.id)}
														timestamps={x.stageChangeTimeStamps}
													></PositionStatus>
												</div>
											</td>
											<td className="border-collapse border border-Content/Border align-top">
												<Th
													name="Комментарий"
												>
												</Th>
												<div className="min-h-[8rem] flex flex-col p-[1.2rem] gap-[1rem]">
													<div className="flex flex-col gap-[1rem] ">
														{x.comments?.map(y => {
															return (
																<div className="flex p-[1.6rem] gap-[7rem] bg-Dominant/Dop border border-Content/Border">
																	<span className="text-Regular(14_16) font-semibold">{y.roleOwner}</span>
																	<span className="text-Regular(14_16)">{y.comment}</span>
																	<span className="text-Regular(12_14) text-Content/Middle">{date.transform(y.createdAt)}</span>
																</div>
															)
														})}
													</div>
													<span
														className="hover:cursor-pointer hover:opacity-70 ease-in-out duration-300 ml-auto text-Accent/Blue text-Regular(14_16)"
														onClick={() => setCommentModal({
															positionId: data.id,
															stageId: x.stage.id,
															isOpen: true,
															isFullMod: false,
															callback: getData
														})}
													>+ Добавить комментарий</span>

												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						)
					})}
				</div>


			</div>

		</div >

	);
}

export default PositionModal;