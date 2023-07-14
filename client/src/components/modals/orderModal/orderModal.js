import { useEffect, useState, useRef, useCallback } from "react";


import useOrder from "../../../hooks/order.hook";
import Loader from "../../loader/loader";
import Cell from '../../cell/cell';
import stageStore from "../../../store/stage";
import PositionStatus from "../../positionStatus/positionStatus";
import PositionUser from "../../positionUser/positionUser";
import Comments from "../../comments/comments";
import usePosition from "../../../hooks/position.hook";
import Checkbox from '../../ui/checkbox/checkbox'

function OrderModal({ orderId }) {

	const intervalId = useRef(null);
	const { getOrder } = useOrder();
	const { setUser, setStatus, setPositionsToUrgent } = usePosition();
	const { stages } = stageStore;
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isUrgent, setIsUrgent] = useState(false);

	const getData = useCallback(async () => {

		if (!orderId) return;

		setLoading(true)

		const { data } = await getOrder({
			id: orderId,
			currentStage: false
		})

		data.positions.forEach(x => {
			const positonStages = stages.reduce((acc, curr) => {
				acc.push({
					id: curr.id,
					item: x.c_position_stages.find(y => y.stage.id === curr.id)
				})
				return acc;
			}, [])
			x.stages = positonStages;
		})

		setData(data);
		setIsUrgent(data.isUrgent);
		setLoading(false);

	}, [getOrder, orderId, stages])

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

	const onUrgent = async () => {
		setIsUrgent(!isUrgent);
	}

	useEffect(() => {
		if (intervalId.current && data?.positions) {
			(async () => {
				const positionsIds = data.positions.map(x => x.id)
				await setPositionsToUrgent({
					ids: positionsIds,
					isUrgent
				});
			})();
		}

	}, [isUrgent])

	return (
		<div className="w-[90vw] max-w-[180rem] min-h-[50rem]">
			{loading && !data && <Loader></Loader>}
			{data &&
				<>
					<div className="py-[3.6rem] pt-[5.2rem] px-[11rem] bg-Accent/Light_Yellow">
						<div className="grid grid-cols-2 gap-[2.6rem] mb-[2.4rem]">
							<div className="flex gap-[3.6rem] items-center">
								<div className="flex gap-[0.5rem]">
									<span className="block text-Regular(16_20)">Заказ:</span>
									<span className="block text-Regular(16_20) font-bold">№{orderId}</span>
								</div>
								<div className="flex gap-[0.5rem]">
									<span className="block text-Regular(16_20)">Дата заказа:</span>
									<span className="block text-Regular(16_20) font-bold">{data.date}</span>


								</div>
							</div>
							<div className="ml-auto">
								<Checkbox
									onChange={onUrgent}
									label="Срочный заказ"
									active={isUrgent}
								></Checkbox>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-x-[2.6rem] gap-y-[1.2rem]">
							<div className="bg-white px-[2.6rem] py-[1.8rem] grid grid-cols-[auto_1fr] gap-x-[1rem] gap-y-[1.2rem]">
								<div className="text-Regular(14_16)">ФИО клиента:</div>
								<div className="text-Regular(14_16) font-bold">{data.userinfo?.name + ' ' + data.userinfo?.surname}</div>
								<div className="text-Regular(14_16)">EMAIL клиента:</div>
								<div className="text-Regular(14_16) font-bold">{data.userinfo?.email}</div>
							</div>

						</div>
					</div>
					<div className="py-[3.6rem] px-[11rem] ">
						<div className="overflow-auto pb-[3rem]">
							<table >
								<tbody>
									<tr >
										<Cell
											padding={false}
											flex={false}
											height="h-[8rem]"
											className="p-[0.6rem] min-w-[13.5rem] text-Regular(12_14) font-semibold border border-Content/Border border-collapse">
											<div className="flex flex-col gap-[0.8rem] text-center">
												<span>Название товара</span>
											</div>
										</Cell>
										{stages.map(x =>
											<Cell
												key={x.id}
												padding={false}
												flex={false}
												height="h-[8rem]"
												className="p-[0.6rem] min-w-[13.5rem] text-Regular(12_14) font-semibold border border-Content/Border border-collapse">
												<div className="flex flex-col gap-[0.8rem] text-center">
													<span>{x.title}</span>
												</div>
											</Cell>
										)}
									</tr>

									{data.positions.map(x =>
										<tr
											key={x.id}
										>
											<Cell
												padding={false}
												flex={false}
												height="h-[8rem]"
												className="p-[0.6rem] min-w-[13.5rem] text-Regular(12_14) border border-Content/Border">
												<span className="line-clamp-3">{x.title}</span>
											</Cell>
											{x['stages'].map(({ id: stageId, item: { id, isCurrentStage, user, status, comments, stageChangeTimeStamps } = {} }, index) => <Cell
												disabled={!status}
												key={index + (id || 0)}
												padding={false}
												flex={false}
												height="h-[8rem]"
												className="p-[0.6rem] min-w-[13.5rem] text-Regular(12_14) border border-Content/Border relative">
												{comments?.length > 0 &&
													<Comments comments={comments}></Comments>
												}
												<div className="flex flex-col gap-[0.8rem] max-w-[100%]">
													<PositionUser
														small={true}
														stageId={stageId}
														currentData={user}
														onSetData={onSetUser(id)}
														isCurrentStage={isCurrentStage}
													></PositionUser>
													<PositionStatus
														className="text-Regular(12_14)"
														currentData={status}
														stageId={stageId}
														small={true}
														isCurrentStage={isCurrentStage}
														onSetData={onSetStatus(id)}
														timestamps={stageChangeTimeStamps}
													></PositionStatus>
												</div>
											</Cell>

											)}
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</>
			}
		</div>

	);
}

export default OrderModal;