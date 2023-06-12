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
		data.forEach(({ id, username, date, positions }) => {

			(async () => {
				const strapiService = this.strapi.entityService;

				//проверяем существует ли  заказ с таким id в системе
				const entry = await strapi.entityService.findMany('api::order.order', {
					filters: {
						orderId: {
							$eq: id
						}
					}
				});



				if (!entry.length) {

					const stack = [];

					//создаем позиции заказа
					positions.forEach(({ id, title, quantity }) => {
						stack.push(
							new Promise(async (resolve, reject) => {

								let stageId;
								let statusId;

								//СМОДЕЛИРУЕМ СИТУАЦИЮ ЧТО У ПОЗИЦИИ НЕТ ПЕЧАТИ
								const HAS_STAMP = false;

								if (!HAS_STAMP) {
									//определим налальный stage позиции
									const [stage] = await strapiService.findMany('api::stage.stage', {
										filters: {
											initial: true
										}
									})

									//определим налальный status позиции
									const statuses = await strapiService.findMany('api::status.status', {
										filters: {
											initial: true
										},
										populate: {
											stage: {
												filters: {
													id: {
														$eq: stage.id
													}
												}
											}
										}
									})

									const status = statuses.find(x => x.stage)

									statusId = status.id;
									stageId = stage.id;
								}


								let result;

								result = await strapiService.create('api::positions.positions', {
									data: {
										title,
										quantity
									}
								})

								await strapiService.create('api::c-position-stage.c-position-stage', {
									data: {
										isCurrentStage: true,
										stage: stageId,
										status: statusId,
										position: result.id
									}
								})

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
									orderId: id,
									date,
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
			date: Parser.formatDate(ORDER_DATA.DATE_STATUS_SHORT),
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

Parser.formatDate = (date) => {
	date = date.split('.');
	return date[2] + '-' + date[1] + '-' + date[0];
}



module.exports = Parser;