import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from "../../context/auth.context";
import { observer } from "mobx-react-lite";
import useDashbord from '../../hooks/dashbord.hook';
import userStore from '../../store/stage'
import Position from "../position/position";
import Container from "../container/container";



function Dashbord() {

    const intervalId = useRef(null);
    const { getDashbord } = useDashbord();
    const [positions, setPositions] = useState([]);
    const id = userStore.currentStage;

    useEffect(() => {
        getData();
        intervalId.current = setInterval(getData, 5000);
        return () => {
            clearInterval(intervalId.current)
        }
    }, [id])

    const getData = async () => {
        const { data } = await getDashbord({
            stage: id
        });
        setPositions(data)
    }



    return (


        <div className="bg-Dominant/Light pt-[3.6rem]">
            <Container>
                {positions.map(({ position }) =>
                    <Position {...position}></Position>
                )}
            </Container>
        </div>


    );
}

export default observer(Dashbord);