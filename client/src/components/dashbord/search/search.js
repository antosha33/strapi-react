import { useEffect, useRef, useState } from "react";
import OutsideAlerter from "../../outsideAlerter/outsideAlerter";
import Multiselect from "../../multiselect/multiselect";
import Button from "../../ui/button/button";

const sanitizeScheme = (data) => {
	const result = Object.entries(data).reduce((acc, [key, item]) => {
		const query = {};
		if (item.type == 'multi') {
			query.id = {
				$in: item.val.map(x => x.id)
			}
		}
		acc[key] = query;
		return acc;
	}, {})

	return result;
}

function Search({ statuses, setFilter, users }) {

	const schemeRef = useRef({});
	const [selected, setSelected] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => {
		setIsOpen(!isOpen)
	}


	const updateScheme = ({ prop, val, type, label }) => {
		if (!val.length) {
			return delete schemeRef.current[prop];
		}
		schemeRef.current[prop] = {
			label,
			type,
			val
		};
	}

	const onSubmit = async () => {
		const res = sanitizeScheme(schemeRef.current)
		setFilter(res);
		renderSelected();
		setIsOpen(false);
	}

	const renderSelected = () => {
		const selected = Object.entries(schemeRef.current).reduce((acc, [prop, { val, label }]) => {
			acc.push({
				prop,
				label,
				value: val.map(x => x.title).join(', ')
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
										className='icon-close text-[2.4rem] text-Content/Middle hover:cursor-pointer'
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
								prop: 'status',
								type: 'multi',
								label: 'Статус',
								val: selected
							})}
							current={schemeRef.current['status']}
							label="Статус"
							placeholder="Не выбран"
							items={statuses}
						></Multiselect>
						<Multiselect
							onEvent={(selected) => updateScheme({
								prop: 'user',
								type: 'multi',
								label: 'Ответственный',
								val: selected
							})}
							current={schemeRef.current['user']}
							label="Ответственный"
							placeholder="Не выбран"
							items={users}
						></Multiselect>
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