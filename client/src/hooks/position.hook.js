import { useEffect, useState, useContext } from "react";
import { AxiosContext } from '../context/request.context';
import useUsers from "./users.hook";



function usePosition() {

	const { authRequest } = useContext(AxiosContext);




	return {
		getDashbord
	}


}

export default usePosition;