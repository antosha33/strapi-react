import { useContext } from "react";
import { AxiosContext } from '../context/request.context';
const qs = require('qs');

function useOrder() {

    const { authRequest } = useContext(AxiosContext);

    const getOrder = async ({ id, currentStage = true }) => {

        const filters = currentStage ? {
            isCurrentStage: true
        } : {}

        const query = qs.stringify({
            populate: {
                positions: {
                    filters: {

                    },
                    populate: {
                        ['c_position_stages']: {

                            filters: filters,
                            populate: {
                                stage: true,
                                status: true,
                                user: true
                            }
                        }
                    }
                },

            }
        }, {
            encodeValuesOnly: true, // prettify URL
        });


        return await authRequest({
            url: `orders/${id}?` + query,
        })

    }

    return {
        getOrder
    };
}

export default useOrder;