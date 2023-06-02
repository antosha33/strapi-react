
import { useContext } from 'react';
import { AxiosContext } from '../context/request.context';
import { AuthContext } from '../context/auth.context';

import usersStore from '../store/users'


function useUsers() {

    const { publicRequest, authRequest } = useContext(AxiosContext);


    const authorize = async ({ identifier, password }) => {
        return await publicRequest({
            url: 'auth/local',
            method: 'POST',
            data: {
                identifier,
                password
            }
        })

    }

    const getMe = async () => {
        return await authRequest({
            url: 'users/me?populate=role',
        })
    }

    const getUsers = async () => {
        return await authRequest({
            url: 'users/?populate=role',
        })
    }

    return {
        authorize,
        getUsers,
        getMe
    };
}

export default useUsers;