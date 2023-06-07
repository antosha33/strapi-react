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
	const [cPositionsStage, setCPositionsStage] = useState([]);
	const [users, setUsers] = useState([]);
	const { id, role, statuses } = userStore.currentStage;




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
			setCPositionsStage(data)
		}
	}




	return (
		<div className="bg-Dominant/Dop py-[2rem] flex-grow-1 flex flex-col gap-[0.8rem] min-h-[100px] relative w-[100%]">
			<Container>
				<div className="py-[2rem] bg-white"></div>
			</Container>
			<div className="flex-1 overflow-auto ">
				<div className=' ml-[5px]'>
					<Container>
						{cPositionsStage.map(({ position, user, id, status: currentStatus, stageChangeTimeStamps }) =>
							<Position
								{...position}
								positionStageId={id}
								timestamps={stageChangeTimeStamps}
								user={user}
								users={users}
								statuses={statuses}
								status={currentStatus}
								key={id}   ></Position>
						)}
					</Container>
				</div>

			</div>

			<Container>
				<div className="py-[2rem] bg-white"></div>
			</Container>
		</div>
	);
}

export default observer(Dashbord);