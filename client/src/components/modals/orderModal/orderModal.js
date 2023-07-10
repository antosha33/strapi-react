import { useEffect, useState } from "react";


import useOrder from "../../../hooks/order.hook";
import Loader from "../../loader/loader";
import Cell from '../../cell/cell';
import stageStore from "../../../store/stage";
import PositionStatus from "../../positionStatus/positionStatus";
import Comments from "../../comments/comments";


function OrderModal({ orderId }) {

	const { getOrder } = useOrder();

	const { stages, currentStage: { statuses } } = stageStore;


	const [data, setData] = useState(null);
	const [header, setHeader] = useState(['Название'])
	const [loading, setLoading] = useState(false);

	useEffect(() => {

		(async () => {
			setLoading(true)
			const { data } = await getOrder({
				id: orderId,
				currentStage: false
			})



			data.positions.forEach(x => {
				const positonStages = stages.reduce((acc, curr) => {
					acc.push({
						id: curr.id,
						item: x.c_position_stages.find(y => y.stage.id == curr.id)
					})
					return acc;
				}, [])
				x.stages = positonStages;
			})

			setData(data)


			const options = data.positions.reduce((acc, curr) => {
				acc.push('Название')
				if (curr.c_position_stages) {
					curr.c_position_stages.forEach(x => {
						acc.push(x.status.title)
					})
				}
				return acc;
			}, [])


			setHeader(options)
			setLoading(false)
		})();

	}, [])



	return (
		<div className="w-[90vw] max-w-[180rem] min-h-[50rem]">
			{loading && !data && <Loader></Loader>}
			{data &&
				<>
					<div className="py-[3.6rem] px-[11rem] bg-Accent/Light_Yellow">
						<div className="grid grid-cols-2 gap-[2.6rem] mb-[2.4rem]">
							<div className="flex gap-[3.6rem]">
								<div className="flex gap-[0.5rem]">
									<span className="block text-Regular(16_20)">Заказ:</span>
									<span className="block text-Regular(16_20) font-bold">№{orderId}</span>
								</div>
								<div className="flex gap-[0.5rem]">
									<span className="block text-Regular(16_20)">Дата заказа:</span>
									<span className="block text-Regular(16_20) font-bold">{data.date}</span>
								</div>
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
					<div className="py-[3.6rem] px-[11rem]  overflow-auto">
						<div className="flex">
							{stages.map(x =>
								<Cell
									height="h-[8rem]"
									className="w-[13.5rem] text-Regular(12_14) ">
									<div className="flex flex-col gap-[0.8rem]">
										<span>{x.title}</span>
									</div>

								</Cell>
							)}
						</div>

						{data.positions.map(x =>
							<div className="flex">

								<Cell
									height="h-[8rem]"
									className="w-[13.5rem] text-Regular(12_14) ">
									<span className="line-clamp-3">{x.title}</span>
								</Cell>
								{x['stages'].map(({ item: { id, status = {}, user = {}, comments } = {} }) =>

									<div className="relative">
										{comments?.length > 0 &&
											<Comments comments={comments}></Comments>
										}
										<Cell
											height="h-[8rem]"
											className="w-[13.5rem] text-Regular(12_14) ">
											<div className="flex flex-col gap-[0.8rem]">
												<span className="line-clamp-1">{user?.username || 'Не выбран'}</span>
												<PositionStatus
													data={statuses}
													currentData={status}
												// onSetData={onSetStatus}
												// setIsVisible={setIsVisible}
												// timestamps={timestamps}
												></PositionStatus>
											</div>

										</Cell>
									</div>

								)}
							</div>
						)}
					</div>
				</>

			}

		</div>

	);
}

export default OrderModal;