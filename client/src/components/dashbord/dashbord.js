import { useEffect, useRef, useCallback, useState } from 'react';

import { observer } from "mobx-react-lite";
import useDashbord from '../../hooks/dashbord.hook';
import userStore from '../../store/stage'
import Position from "../position/position";
import Container from "../container/container";
import useUsers from '../../hooks/users.hook';
import OrderModal from '../orderModal/orderModal';
import Modal from '../modal/modal'
import Switcher from '../ui/swticher/switcher'
import Pagination from '../pagination/pagination';
import Cell from '../cell/cell';


const TdCell = ({ height = 'h-[6rem]', available = true, ...props }) => {
	if (!available) return null

	return (
		<div className={`
			${height}
			${props.className}
			p-[1.2rem] flex items-center
		`} >
			<span className='text-Regular(12_14) text-Content/Dark font-semibold'>{props.title}</span>
		</div>
	)
}


const settings = {
	checkbox: {
		type: 'checkbox',
		available: true,
		className: 'w-[4.8rem] flex items-center',
	},
	user: {
		title: 'Ответственный',
		available: true,
		className: 'w-[16rem]',
		padding: false
	},
	title: {
		available: true,
		title: 'Назв-е товара',
		className: 'w-[21.7rem] text-Regular(12_14)',
	},
	// code: {
	// 	available: true,
	// 	title: 'Назв-е товара'
	// },
	qauntity: {
		available: true,
		title: 'Кол-во',
		className: 'w-[10rem] text-Regular(16_18)'
	},
	order: {
		available: true,
		title: '№ зак.',
		className: 'w-[12.2rem] '
	},
	status: {
		available: true,
		title: 'Статус',
		className: 'w-[18.7rem]',
		padding: false
	},

}




function Dashbord() {

	const intervalId = useRef(null);
	const { getDashbord } = useDashbord();
	const { getUsersByRole } = useUsers();
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);
	const [meta, setMeta] = useState([]);
	const [users, setUsers] = useState([]);
	const [groupMod, setGroupMod] = useState(false);
	const [detailModal, setDetailModal] = useState(false);
	const { id, role, statuses } = userStore.currentStage;

	const getData = async () => {
		if (id) {
			const { data, meta: { pagination } } = await getDashbord({
				stage: id,
				page
			});
			if (groupMod) {
				setItems(groupItems(data))
			} else {
				setItems(data)
			}
			setMeta(pagination)
		}
	}



	const getUsers = async () => {
		const data = await getUsersByRole(role);
		setUsers(data)
	}

	useEffect(() => {
		if (id) {
			getData();
			getUsers();
			intervalId.current = setInterval(getData, 5000);
		}
		return () => {
			clearInterval(intervalId.current)
		}
	}, [id, groupMod, page])

	const onPageChange = (page) => {
		setPage(page)
	}

	const onOrderDetail = (id) => {
		setDetailModal(id);
	}


	const groupItems = (data) => {
		const group = data.reduce((acc, curr) => {
			if (acc[curr.position.order.id]) {
				acc[curr.position.order.id].push(curr);
			} else {
				acc[curr.position.order.id] = [curr]
			}
			return acc;
		}, {})
		return Object.entries(group);
	}



	const render = ({ position, user, id, status: currentStatus, stageChangeTimeStamps }) => {

		return (
			<Position
				{...position}
				positionStageId={id}
				timestamps={stageChangeTimeStamps}
				user={user}
				users={users}
				statuses={statuses}
				status={currentStatus}
				key={id}
				onOrderDetail={onOrderDetail}
				settings={settings}
			>

			</Position>
		)
	}


	return (
		<>
			<div className="bg-Dominant/Dop py-[2rem] flex-1 flex flex-col gap-[0.8rem] min-h-[100px] relative w-[100%]">
				<Container>
					<div className="p-[1.2rem] bg-white">
						<Switcher
							onChange={() => setGroupMod(!groupMod)}
							label="Сгруппировать по заказам"
						></Switcher>
					</div>
				</Container>
				<div className="flex-1 overflow-auto ">


					<div className=' ml-[5px]'>
						<Container>
							<div className="flex bg-white">

								{Object.values(settings).map(x => <TdCell {...x}></TdCell>)}
							</div>

							{
								Array.isArray(items[0]) ?

									items?.map(([id, item]) => {
										return (
											<div key={id}>
												<span className='text-Content/Dark block font-semibold text-Regular(16_18) mb-[1.1rem]'>{id}</span>
												<div className='mb-[3.6rem]'>
													{item.map(render)}
												</div>
											</div>
										)
									})

									:
									items?.map(render)
							}
						</Container>


					</div>

				</div>


				<Container>
					<div className="p-[1.2rem] bg-white">
						<Pagination {...meta} onPageChange={onPageChange}></Pagination>
					</div>
				</Container>
			</div>
			<Modal
				closeModal={() => setDetailModal(false)}
				isOpen={!!detailModal}
			>
				<OrderModal orderId={detailModal}></OrderModal>
			</Modal>
		</>

	);
}

export default observer(Dashbord);