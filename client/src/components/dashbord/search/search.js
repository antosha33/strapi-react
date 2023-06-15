import { useEffect, useRef, useState } from "react";
import OutsideAlerter from "../../outsideAlerter/outsideAlerter";
import Multiselect from "../../multiselect/multiselect";
import Button from "../../ui/button/button";
import Input from "../../ui/input/input";

const sanitizeScheme = (data) => {
	const result = Object.entries(data || {}).reduce((acc, [path, { type, val }]) => {
		let query = {};
		let counter = 0;
		path = path.split('.');
		path.forEach(x => {
			if (acc[x]) {
				counter++;
				query = acc[x]
			}
		})
		if (counter) {
			path.splice(0, counter);
		}
		const buildQuery = (obj) => {
			if (!path.length) {
				if (type == 'multi') {
					obj['$in'] = val.map(x => x.id);
				}
				if (type == 'search') {
					obj['$contains'] = val
				}
				return;
			};
			const key = path.splice(0, 1);
			if (!obj[key]) {
				obj[key] = {};
			}
			buildQuery(obj[key])
		}
		buildQuery(query)
		if (counter) {
			query = {}
		}
		return { ...acc, ...query }
	}, {})
	return result
}

function Search({ statuses, setFilter, users }) {

	const schemeRef = useRef({});
	const [selected, setSelected] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => {
		setIsOpen(!isOpen)
	}

	const updateScheme = ({ val, type, label, path }) => {
		if ((Array.isArray(val) && !val.length) || !val) {
			delete schemeRef.current[path];
		} else {
			schemeRef.current[path] = {
				label,
				val,
				type,
				path
			};
		}

	}

	const onSubmit = async () => {
		const res = sanitizeScheme(schemeRef.current);
		setFilter({...res});
		renderSelected();
		setIsOpen(false);
	}

	const renderSelected = () => {
		const selected = Object.entries(schemeRef.current || {}).reduce((acc, [prop, { val, label }]) => {
			acc.push({
				prop,
				label,
				value: Array.isArray(val) ? val.map(x => x.title).join(', ') : val
			})
			return acc;
		}, [])
		setSelected(selected)
	}

	const onRemove = (id) => {
		delete schemeRef.current[id];
		onSubmit();
	}

	

	return (
		<div className="relative flex-1 flex ">
			<OutsideAlerter
				className=" w-[100%] flex"
				onEvent={() => setIsOpen(false)}
			>
				<div
					onClick={toggleOpen}
					className="hover:border-Accent/Blue hover:cursor-pointer ease-in-out duration-300 border w-[100%]  border-Content/Border flex px-[1.2rem] gap-[0.6rem] items-center">
					{selected.length ?
						selected.map(x => {
							return (
								<div
									className="max-w-[30rem] px-[0.7rem] h-[3.2rem] text-Regular(16_18) flex gap-[0.6rem]  items-center whitespace-nowrap bg-[#BDDAF6]">
									<span className="overflow-hidden text-ellipsis inline-block">{x.label} : {x.value}</span>
									<i
										className='icon-close-1 text-[2.4rem] text-Content/Middle hover:cursor-pointer'
										onClick={(ev) => { ev.stopPropagation(); onRemove(x.prop) }}
									></i>
								</div>
							)
						})
						:
						<span className="block text-Regular(16_18) text-Content/Middle">Фильтр</span>
					}
				</div>
				<div
					className={`
							${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}
							border  w-[66rem] border-Content/Border bg-white z-10 pt-[5rem] px-[2.6rem] pb-[2.6rem] absolute top-[100%] left-0
						`}>
					<div className="flex flex-col gap-[1.2rem]">
						<Multiselect
							onEvent={(selected) => updateScheme({
								key: 'status',
								path: 'status.id',
								type: 'multi',
								label: 'Статус',
								val: selected
							})}
							current={schemeRef.current['status.id']}
							label="Статус"
							placeholder="Не выбран"
							items={statuses}
						></Multiselect>
						<Multiselect
							onEvent={(selected) => updateScheme({
								key: 'user',
								path: 'user.id',
								type: 'multi',
								label: 'Ответственный',
								val: selected
							})}
							current={schemeRef.current['user.id']}
							label="Ответственный"
							placeholder="Не выбран"
							items={users}
						></Multiselect>
						<Input
							onInput={({ target: { value } }) => updateScheme({
								key: 'position',
								path: 'position.order.orderId',
								type: 'search',
								label: 'Номер заказа',
								val: value
							})}
							initial={schemeRef.current['position.order.orderId']?.val}
							labelSmall={true}
							label="Номер заказа"
						></Input>
						<Input
							onInput={({ target: { value } }) => updateScheme({
								key: 'position',
								path: 'position.order.username',
								type: 'search',
								label: 'Заказчик',
								val: value
							})}
							initial={schemeRef.current['position.order.username']?.val}
							labelSmall={true}
							label="Заказчик"
						></Input>
					</div>

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