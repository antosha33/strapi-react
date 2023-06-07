const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


class Parser {
	constructor(strapi) {
		if (typeof Parser.instance == 'object') {
			return Parser.instance;
		}
		this.strapi = strapi;
		Parser.instance = this;
		return this;
	}

	setOptions({ url, time }) {
		this.url = url,
			this.time = time
	}

	async getData() {

		const response = await fetch(this.url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				time: this.time
			})
		});

		const { result } = await response.json();

		const data = Parser.prepareOrderData({
			data: result
		})

		this.createData(data)
	}


	async createData(data) {
		data.forEach(({ id, username, positions }) => {

			(async () => {
				const strapiService = this.strapi.entityService;

				//проверяем существует ли  заказ с таким id в системе
				const entry = await strapi.entityService.findOne('api::order.order', id);

				if (!entry) {

					const stack = [];


					//создаем позиции заказа
					positions.forEach(({ id, title, quantity }) => {
						stack.push(
							new Promise(async (resolve, reject) => {
								const entry = await strapi.entityService.findOne('api::positions.positions', id);
								let result;
								if (!entry) {
									result = await strapiService.create('api::positions.positions', {
										data: {
											id,
											title,
											quantity
										}
									})
									await strapiService.create('api::c-position-stage.c-position-stage', {
										data: {
											isCurrentStage: true,
											stage: 1,
											status:2,
											position: id
										}
									})
								}
								resolve(result)
							})
						)

					})

					//создаем сам заказ
					Promise.all(stack).then(async (ev) => {
						const ids = ev.map(x => x.id);
						if (ids.length) {
							await strapiService.create('api::order.order', {
								data: {
									id,
									username,
									positions: ids
								}
							})
						}
					})
				}
			})();
		});
	}
}


Parser.prepareOrderData = ({
	data: { orders },
}) => {
	const result = Object.entries(orders).reduce((acc, [id, { ORDER_DATA, ORDER_ITEMS_DATA }]) => {

		const item = {
			id,
			username: ORDER_DATA.USER_LAST_NAME + ' ' + ORDER_DATA.USER_NAME,
			positions: ORDER_ITEMS_DATA.map(x => ({
				id: x.ID,
				title: x.NAME,
				quantity: x.QUANTITY
			}))
		}

		acc.push(item);

		return acc;
	}, [])

	return result
}



module.exports = Parser;