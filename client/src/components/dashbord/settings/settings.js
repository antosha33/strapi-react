import { useCallback, useEffect, useState } from "react";
import Button from "../../ui/button/button";
import dashbordStore from '../../../store/dashbord';
import Checkbox from "../../ui/checkbox/checkbox";
import useUsers from '../../../hooks/users.hook';
import ButtonBorder from "../../ui/buttonBorder/buttonBorder";
import ButtonSimple from "../../ui/buttonSimple/buttonSimple";
import OutsideAlerter from "../../outsideAlerter/outsideAlerter";


const defaultSettings = {
	checkbox: {
		type: 'checkbox',
		available: true,
		configurable: false,
		className: 'w-[4.8rem] flex items-center',

	},
	user: {
		title: 'Ответственный',
		available: true,
		className: 'w-[16rem]',
		configurable: true,
		padding: false,
		sortPath: 'user.username'

	},
	title: {
		available: true,
		title: 'Назв-е товара',
		configurable: true,
		className: 'w-[21.7rem] text-Regular(12_14)',
		sortPath: 'position.title'
	},
	code: {
		available: true,
		configurable: true,
		title: 'Артикул',
		className: 'w-[10rem] text-Regular(16_18) relative',
	},
	quantity: {
		available: true,
		title: 'Кол-во',
		configurable: true,
		className: 'w-[10rem] text-Regular(16_18)',
		sortPath: 'position.quantity'
	},
	order: {
		available: true,
		title: '№ зак.',
		configurable: true,
		className: 'w-[12.2rem]',
		sortPath: 'position.order.orderId'
	},
	status: {
		available: true,
		title: 'Статус',
		configurable: true,
		className: 'w-[18.7rem]',
		padding: false,
		sortPath: 'status.title'
	},

};

function Settings() {


	const [newSettings, setNewSettings] = useState({});
	const { settings } = dashbordStore;
	const { getMe, saveSettings } = useUsers();
	const [isOpen, setIsOpen] = useState(false);

	const closeSettings = useCallback(() => {
		setIsOpen(false)
	}, [])

	useEffect(() => {
		(async () => {
			const { settings } = await getMe();
			dashbordStore.setSettings(JSON.parse(JSON.stringify(settings || defaultSettings)));
		})();
	}, [getMe])

	useEffect(() => {
		setNewSettings(JSON.parse(JSON.stringify(settings)));
	}, [settings])

	const onChange = (key) => {
		const item = newSettings[key];
		item.available = !item.available;
		setNewSettings({ ...newSettings });
	}

	const onSubmit = async () => {
		await saveSettings({
			settings: newSettings
		});
		dashbordStore.setSettings(newSettings);
		setIsOpen(false);
	}

	const selectAll = async (isAvailable) => {
		const settings = Object.entries(newSettings).reduce((acc, [key, item]) => {
			acc[key] = item;
			item.available = isAvailable;
			return acc;
		}, {});
		setNewSettings(settings)

	}

	const onCancel = () => {
		setNewSettings(JSON.parse(JSON.stringify(settings)));
		setIsOpen(false)
	}




	return (
		<OutsideAlerter onEvent={closeSettings}>
			<div className="relative">
				<div
					onClick={() => setIsOpen(!isOpen)}
					className="border hover:cursor-pointer hover:border-Accent/Blue ease-in-out duration-300 flex items-center justify-center border-Content/Border w-[4.6rem] h-[4.6rem] group">
						<i className="icon-gear  group-hover:text-Accent/Blue text-Regular(18_24) text-Content/Light"></i>
				</div>

				{isOpen &&


					<div
						className="border z-30 w-[80rem] bg-white border-Content/Border absolute top-[100%] left-0">
						<div className="flex border-Dominant/Dop border border-t-0 border-r-0 border-l-0 justify-between p-[2.6rem]">
							<span className="block text-Regular(16_18)">Настроить таблицу</span>
							<span className="block">Close</span>
						</div>
						<div className="py-[1.4rem] px-[2.6rem] grid grid-cols-3">
							{Object.entries(newSettings || {}).filter(([_, item]) => item.configurable).map(([key, item]) =>
								<div key={key} className="py-[0.9rem]">
									{item.available}
									<Checkbox
										onChange={() => onChange(key)}
										label={item.title}
										active={item.available}>
									</Checkbox>
								</div>

							)}
						</div>
						<div className="p-[2.6rem] flex justify-between items-center">
							<span>По умолчанию</span>
							<div className="flex gap-[1.2rem]">
								<Button
									onPress={onSubmit}
									name="Применить"
								>
								</Button>
								<ButtonSimple
									onPress={onCancel}
									name="Отменить"
								></ButtonSimple>
							</div>
							<div className="flex gap-[1.8rem]">
								<ButtonBorder
									onPress={() => selectAll(true)}
									name="Выбрать всё">
								</ButtonBorder>
								<ButtonBorder
									onPress={() => selectAll(false)}
									name="Отменить всё"
								></ButtonBorder>
							</div>
						</div>
					</div>


				}

			</div>
		</OutsideAlerter>

	);
}

export default Settings;