
import { useContext, useEffect, useState } from 'react';
import { AxiosContext } from '../context/request.context';
import { AuthContext } from '../context/auth.context';

import usersStore from '../store/users'


function useStages() {

    const { publicRequest, authRequest } = useContext(AxiosContext);
    const [stages, setStages] = useState([]);


    useEffect(() => {
        (async () => {
            const { data } = await authRequest({
                url: 'stages',
            })
            setStages(data)
        })();
    }, [])


    return {
        stages
    };
}

export default useStages;