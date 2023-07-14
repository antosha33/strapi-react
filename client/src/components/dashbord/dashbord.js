import { useCallback, useEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip'
import { observer } from "mobx-react-lite";
import useDashbord from '../../hooks/dashbord.hook';
import stageStore from '../../store/stage'
import Position from "../position/position";
import Container from "../container/container";
import useUsers from '../../hooks/users.hook';
import OrderModal from '../modals/orderModal/orderModal';
import PositionModal from '../modals/positionModal/positionModal';
import Modal from '../modal/modal'
import Switcher from '../ui/swticher/switcher'
import Pagination from '../pagination/pagination';
import ActionDropdown from '../actionDropdown/actionDropdown';
import SortDropdown from '../sortDropdown/sortDropdown';
import Settings from './settings/settings';
import dashbordStore from '../../store/dashbord'
import usersStore from '../../store/users'
import Search from './search/search';
import CommentModal from '../modals/commentModal/commentModal';
import Loader from '../loader/loader';
import './style.css'




const TdCell = ({ height = 'h-[6rem]', name, sort: { path, correction } = {}, available = true, onClick, title, sortPath, ...props }) => {

	if (!available) return null;


	let direction;

	if (path === sortPath) {
		direction = correction;
	}

	return (
		<td
			onClick={() => dashbordStore.setSort({
				path: sortPath,
				name: title
			})}
			className={`
			${height}
			${props.className}
			p-[1.2rem] flex items-center
		`} >
			<div className="flex gap-[0.6rem] items-center">
				<span className='text-Regular(12_14) text-Content/Dark font-semibold'>{title}</span>
				{props.configurable &&
					<span className={`${direction === 'asc' ? 'text-Content/Dark' : direction === 'desc' ? 'text-Content/Dark rotate-180' : 'text-Content/Light'}`}>
						<i className={`icon-sort text-[1.6rem] flex-auto`}></i>
					</span>
				}
			</div>

		</td>
	)
}





function Dashbord() {

	const [filter, setFilter] = useState(null);
	const intervalId = useRef(null);
	const { getDashbord } = useDashbord();
	const { getUsers } = useUsers();
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);
	const [meta, setMeta] = useState([]);

	const [groupMod, setGroupMod] = useState(false);
	const [detailModal, setDetailModal] = useState(false);
	const [positionModal, setPositionModal] = useState(false);
	const [commentModal, setCommentModal] = useState({
		isOpen: false,
		positionId: null,
		stageId: null,
		isFullMod: true,
		callback: null
	});
	const { id, role, statuses } = stageStore.currentStage;
	const { settings, sort } = dashbordStore;

	const [loading, setLoading] = useState(false);

	const getData = useCallback(async (silent = false) => {
		!silent && setLoading(true)
		if (id) {
			const { data, meta: { pagination } } = await getDashbord({
				stage: id,
				page,
				filter,
				sort
			});
			if (groupMod) {
				setItems(groupItems(data))
			} else {
				setItems(data);
			}
			setMeta(pagination)
		}
		!silent && setLoading(false)
	}, [getDashbord, groupMod, id, page, filter, sort])

	useEffect(() => {
		if (id) {
			getData();
			intervalId.current = setInterval(() => getData(true), 50000);
		}
		return () => {
			clearInterval(intervalId.current)
		}
	}, [id, groupMod, page, filter, sort, getData])

	useEffect(() => {
		setPage(1)
	}, [id])


	const getAllUsers = useCallback(async () => {
		const data = await getUsers();
		usersStore.setUsers(data);
	}, [getUsers])

	useEffect(() => {
		getAllUsers();
	}, [getAllUsers])



	const onPageChange = (page) => {
		setPage(page)
	}

	const onOrderDetail = (id) => {
		setDetailModal(id);
	}

	const onPositionDetail = (id) => {
		setPositionModal(id);
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

	const setComment = (positionId) => {
		setCommentModal(prev => ({
			...prev,
			isOpen: true,
			positionId,
			isFullMod: true
		}));
	}

	const closeCommentModalAndReftesh = async () => {
		commentModal.callback && await commentModal.callback();

		setCommentModal(prev => ({
			...prev,
			isOpen: false,
			isFullMod: true,
			stageId: null,
			positionId: null,
			callback: null
		}));

		await getData(true);
	}


	const render = ({ isUrgent, comments, stage: { id: stageId }, position, user, id, status: currentStatus, isCurrentStage, stageChangeTimeStamps }) => {

		return (
			<Position
				{...position}
				isUrgent={isUrgent}
				positionStageId={id}
				timestamps={stageChangeTimeStamps}
				user={user}
				statuses={statuses}
				status={currentStatus}
				comments={comments}
				key={id}
				onOrderDetail={onOrderDetail}
				onPositionDetail={onPositionDetail}
				settings={settings}
				setComment={setComment}
				getData={getData}
				role={role}
				stageId={stageId}
				isCurrentStage={isCurrentStage}
			>
			</Position>
		)
	}



	return (
		<>
			<div className="bg-Dominant/Dop py-[2rem] flex-1 flex flex-col gap-[0.8rem] min-h-[100px] relative w-[100%]">
				<div className='max-w-[164rem] w-[calc(100vw-15rem)] m-auto'>

					<div className="p-[1.2rem] bg-white flex gap-[2.6rem]">
						<Settings></Settings>
						<Search
							setFilter={setFilter}
							statuses={statuses}></Search>
						{!!Object.keys(sort).length &&
							<div
								onClick={() => dashbordStore.resetSort()}
								className='bg-Dominant/Dop text-Regular(16_18) p-[0.8rem] flex gap-[0.3rem] items-center'>
								<span className="text-Content/Middle">Сортировка:</span>
								<span>{sort.name}</span>
								<i className='icon-close'></i>
							</div>}
						<Switcher
							onChange={() => setGroupMod(!groupMod)}
							label="Сгруппировать по заказам"
						></Switcher>
						<SortDropdown></SortDropdown>
					</div>
				</div>

				<div className="flex-1  max-w-[164rem] w-[calc(100vw-15rem)] m-auto relative overflow-hidden">
					<div className="js-scrollable-dashbord overflow-auto h-[100%]">
						{loading ? <Loader></Loader> :
							settings && <>
								{
									Array.isArray(items[0]) ?
										items?.map(([id, item]) => {
											return (
												<div key={id}>
													<span className='text-Content/Dark block font-semibold text-Regular(16_18) mb-[1.1rem]'>{id}</span>
													<div className="flex bg-white">
														{Object.entries(settings).map(([key, x]) => <TdCell key={key} sort={sort} {...x}>
														</TdCell>)}
													</div>
													<div className='mb-[3.6rem]'>
														{item.map(render)}
													</div>
												</div>
											)
										})
										:
										<table className='product-table'>
											<tbody>
												<tr className="flex bg-white">
													{Object.entries(settings).map(([key, x]) => <TdCell sort={sort} key={key} name={key} {...x}>
													</TdCell>)}
												</tr>
												{items?.map(render)}
											</tbody>

										</table>
								}
							</>
						}

					</div>
				</div>

				<Container>
					<div className="p-[1.2rem] bg-white flex relative">
						<div className="w-[50%]">
							<ActionDropdown onEvent={() => getData(true)}></ActionDropdown>
						</div>
						<div className="w-[50%] ">
							<Pagination {...meta} onPageChange={onPageChange}></Pagination>
						</div>
					</div>
				</Container>
			</div>
			<Modal
				closeModal={() => setDetailModal(false)}
				isOpen={!!detailModal}
			>
				<OrderModal orderId={detailModal}></OrderModal>
			</Modal>
			<Modal
				closeModal={() => setPositionModal(false)}
				isOpen={!!positionModal}
			>
				<PositionModal setCommentModal={setCommentModal} positionId={positionModal}></PositionModal>
			</Modal>
			<Modal
				closeModal={() => setCommentModal({ stageId: null, positionId: null, isFullMod: true, isOpen: false })}
				isOpen={commentModal.isOpen}
			>
				<CommentModal stageId={commentModal.stageId} isFullMod={commentModal.isFullMod} callback={closeCommentModalAndReftesh} positionId={commentModal.positionId}></CommentModal>
			</Modal>
			<Tooltip
				style={{
					zIndex: 1000,
					fontSize: '14px'
				}}
				openOnClick={true}
				id={'role-alert'}
			></Tooltip>
		</>

	);
}

export default observer(Dashbord);