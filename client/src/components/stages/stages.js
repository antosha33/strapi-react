import { observer } from "mobx-react-lite"
import stageStore from "../../store/stage"
import usersStore from "../../store/users"
import useStages from "../../hooks/stages.hook";
import { useEffect } from "react";

function Stages() {

	const { stages = [] } = useStages();
	const { currentStage:id } = stageStore;
	const { role } = usersStore.currentUser;


	useEffect(() => {
		if (role && stages.length) {
			const stage = stages.find(x => x.role?.toLowerCase() === role.toLowerCase());
			stageStore.setCurrentStage(stage)
			stageStore.setStages(stages)
		}
	}, [role, stages])


	const onStageChange = (stage) => {
		stageStore.setCurrentStage(stage)
	}

	return (
		<div className="flex gap-[0.8rem] py-[1.8rem]">
			{stages.map(x => (
				<div
					onClick={() => onStageChange(x)}
					key={x.id}
					className={`
                        ${x.id == id ? 'bg-Accent/Yellow' : 'bg-Dominant/Dop'}
                        p-[0.5rem] text-center flex-auto w-[12.6rem] h-[4.4rem]  border border-Content/Border flex items-center justify-center
                    `}>
					<div className="text-Regular(14_16)">{x.title}</div>
				</div>
			))}
		</div>

	)

}

export default observer(Stages);