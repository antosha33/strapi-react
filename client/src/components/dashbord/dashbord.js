import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from "../../context/auth.context";
import { observer } from "mobx-react-lite";
import useDashbord from '../../hooks/dashbord.hook';
import userStore from '../../store/stage'
import Position from "../position/position";
import Container from "../container/container";
import useUsers from '../../hooks/users.hook';
import useStatus from '../../hooks/status.hook';



function Dashbord() {

	const intervalId = useRef(null);
	const { getDashbord } = useDashbord();
	const { getUsersByRole } = useUsers();
	const { getStatuses } = useStatus();
	const [positions, setPositions] = useState([]);
	const [users, setUsers] = useState([]);
	const { id, role } = userStore.currentStage;


	useEffect(() => {
		getData();
		getUsers();
		getStatusesByStage();
		intervalId.current = setInterval(getData, 5000);
		return () => {
			clearInterval(intervalId.current)
		}
	}, [id])

	const getUsers = async () => {
		const data = await getUsersByRole(role);
		setUsers(data)
	}

	const getData = async () => {
		if (id) {
			const { data } = await getDashbord({
				stage: id
			});
			setPositions(data)
		}
	}

	const getStatusesByStage =async() => {
		const data  = await getStatuses({stage: id});
	}


	return (
		<div className="bg-Dominant/Light pt-[3.6rem]">
			<Container>
				{positions.map(({ position, user }) =>
					<Position key={position.id} {...position} user={user} users={users}></Position>
				)}
			</Container>
		</div>
	);
}

export default observer(Dashbord);