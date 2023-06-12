import { useRef, useState } from "react";
import OutsideAlerter from "../../outsideAlerter/outsideAlerter";
import Multiselect from "../../multiselect/multiselect";
import Button from "../../ui/button/button";

const sanitizeScheme = (data) => {
	const result = Object.entries(data).reduce((acc, [key, item]) => {
		const query = {};
		if(item.type == 'multi'){
			query.id = {
				$in: item.val.map(x => x.id)
			}
		}
		acc[key] =query;
		return acc;
	}, {})

	return result;
}

function Search({ statuses, setFilter }) {

	const schemeRef = useRef({});
	const [isOpen, setIsOpen] = useState(false);
	const toggleOpen = () => {
		setIsOpen(!isOpen)
	}
	const updateScheme = ({prop, val, type}) => {
		schemeRef.current[prop] = {
			type,
			val
		};
	}
	const onSubmit = async () => {
		const res = sanitizeScheme(schemeRef.current)
		setFilter(res);
	}

	return (
		<div className="relative flex-1 flex ">
			<OutsideAlerter
				className=" w-[100%] flex"
				onEvent={() => setIsOpen(false)}
			>
				<div
					onClick={toggleOpen}
					className="border w-[100%]  border-Content/Border  p-[1.2rem]">
					<span className="block text-Regular(16_18) text-Content/Middle">Фильтр и поиск</span>
				</div>
				<div
					className={`
							${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}
							border  w-[66rem] border-Content/Border bg-white z-10 pt-[5rem] px-[2.6rem] pb-[2.6rem] absolute top-[100%] left-0
						`}>
					<Multiselect
						onEvent={(selected) => updateScheme({	
							prop: 'status',
							type: 'multi',
							val: selected
						})}
						placeholder="Не выбран"
						items={statuses}
					></Multiselect>
					<div className="mt-[2.6rem]">
						<Button
							onPress={onSubmit}
							name='Применить'
						></Button>
					</div>

				</div>
			</OutsideAlerter>
		</div>

	);
}

export default Search;