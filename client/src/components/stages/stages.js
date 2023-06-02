import { observer } from "mobx-react-lite"
import userStore from "../../store/stage"
import useStages from "../../hooks/stages.hook";

function Stages() {

    const { stages = [] } = useStages();
    const id = userStore.currentStage;


    const onStageChange = (id) => {
        userStore.setCurrentStage(id)
    }

    return (
        <div className="flex gap-[0.8rem]">
            {stages.map(x => (
                <div
                    onClick={() => onStageChange(x.id)}
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