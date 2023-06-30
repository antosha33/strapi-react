
import { useContext, useEffect, useState } from 'react';
import { AxiosContext } from '../context/request.context';
const qs = require('qs');


const query = qs.stringify({
	populate: {
		statuses:true,
		suggests: true
	},
}, {
	encodeValuesOnly: true, // prettify URL
});


function useStages() {

	const { publicRequest, authRequest } = useContext(AxiosContext);
	const [stages, setStages] = useState([]);

	useEffect(() => {
		(async () => {
			const { data } = await authRequest({
				url: 'stages?' + query,
			})
			setStages(data)
		})();
	}, [])


	return {
		stages
	};
}

export default useStages;