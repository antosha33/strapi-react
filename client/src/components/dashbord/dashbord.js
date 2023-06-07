import { useEffect, useRef, useCallback,useState } from 'react';

import { observer } from "mobx-react-lite";
import useDashbord from '../../hooks/dashbord.hook';
import userStore from '../../store/stage'
import Position from "../position/position";
import Container from "../container/container";
import useUsers from '../../hooks/users.hook';
import useStatus from '../../hooks/status.hook';
import Switcher from '../ui/swticher/switcher'








function Dashbord() {

	const intervalId = useRef(null);
	const { getDashbord } = useDashbord();
	const { getUsersByRole } = useUsers();
	const { getStatuses } = useStatus();
	const [items, setItems] = useState([]);
	const [users, setUsers] = useState([]);
	const [groupMod, setGroupMod] = useState(false);
	const { id, role, statuses } = userStore.currentStage;
	const [isGrouped, setIsGrouped] = useState(false);

	const getData = async () => {
		if (id) {
			const { data } = await getDashbord({
				stage: id
			});
			if (groupMod) {
				setItems(groupItems(data))
			} else {
				setItems(data)
			}
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
			// getStatusesByStage();
			intervalId.current = setInterval(getData, 5000);
		}
		return () => {
			clearInterval(intervalId.current)
		}
	}, [id, groupMod])




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
				key={id}   ></Position>
		)
	}



	return (
		<div className="bg-Dominant/Dop py-[2rem] flex-grow-1 flex flex-col gap-[0.8rem] min-h-[100px] relative w-[100%]">
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
					{
						Array.isArray(items[0]) ?
							<Container>
								{items?.map(([id, item]) => {
									return (
										<div key={id}>
											<span className='text-Content/Dark'>{id}</span>
											{item.map(render)}
										</div>
									)
								})}
							</Container>
							:
							<Container>
								{items?.map(render)}
							</Container>
					}

				</div>

			</div>

			<Container>
				<div className="py-[2rem] bg-white"></div>
			</Container>
		</div>
	);
}

export default observer(Dashbord);