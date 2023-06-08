import { useEffect, useState } from "react";
import useOrder from "../../hooks/order.hook";
import Cell from "../cell/cell";
import stageStore from "../../store/stage";

function OrderModal({ orderId }) {

    const { getOrder } = useOrder();

    const {stages} = stageStore;

    console.log(stages)
    const [data, setData] = useState(null);
    const [header, setHeader] = useState(['Название'])

    useEffect(() => {
        (async () => {
            const { data } = await getOrder({
                id: orderId,
                currentStage: false
            })
            setData(data);
            const options = data.positions.reduce((acc, curr) => {

                acc.push('Название')

                if(curr.c_position_stages){
                    curr.c_position_stages.forEach(x => {
                        acc.push(x.status.title)
                    })
                }

                return acc;
            }, [])
            
            setHeader(options)

        })();

    }, [])

    // console.log(header)

    return (
        <div className="w-[90vw] max-w-[180rem] min-h-[50rem]">
            {data &&
                <>
                    <div className="py-[3.6rem] px-[11rem] bg-Accent/Light_Yellow">
                        <div className="grid grid-cols-2 gap-[2.6rem]">
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
                    </div>
                    <div className="py-[3.6rem] px-[11rem]">
                        {data.positions.map(x =>
                            <div className="flex">
                                <Cell
                                    height="h-[8rem]"
                                    className="w-[13.5rem] text-Regular(12_14) ">
                                    <span className="line-clamp-3">{x.title}</span>
                                </Cell>
                                {x['c_position_stages'].map(({ stage, status, user }) =>
                                    <Cell
                                        height="h-[8rem]"
                                        className="w-[13.5rem] text-Regular(12_14) ">
                                        <div className="flex flex-col gap-[0.8rem]">
                                            <span className="line-clamp-1">{user?.username || 'Не выбран'}</span>
                                            <span>{status.title}</span>
                                        </div>

                                    </Cell>
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