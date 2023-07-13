'use strict';

/**
 * c-position-stage controller
 */

const graph = require('../../../modules/graph/graph')
const { createCoreController } = require('@strapi/strapi').factories;




module.exports = createCoreController('api::c-position-stage.c-position-stage', ({ strapi }) => ({


	async find(ctx) {
		const sanitizedQueryParams = await this.sanitizeQuery(ctx);
		//глубокая сортировка
		let sort = sanitizedQueryParams.sort || {};
		let { sort: { path, correction } = {} } = ctx.query;
		if (path) {
			path = path.split('.');
			const buildSortQuery = (obj) => {
				if (!path.length) {
					return;
				};
				const key = path.splice(0, 1);
				if (!obj[key]) {
					obj[key] = path.length ? {} : correction;
				}
				buildSortQuery(obj[key])
			}
			buildSortQuery(sort)
		}
		const { results, pagination } = await strapi.service('api::c-position-stage.c-position-stage').find({
			...sanitizedQueryParams,
			sort,
		});
		const sanitizedResults = await this.sanitizeOutput(results, ctx);
		return this.transformResponse(sanitizedResults, { pagination });
	},

	async setPositionsToCanceled(ctx) {
		const { data } = ctx.request.body;
		const stack = [];

		data.forEach(x => {
			ctx.request.body = null;
			ctx.params.nextSteps = [12];
			ctx.params.id = x;
			stack.push(new Promise(async (res, rej) => {
				try {
					await this.updateStage(ctx);
					res();
				} catch (e) {
					rej(e)
				}
			}))
		})

		return Promise.all(stack).then(async () => {
			return await strapi.service('api::c-position-stage.c-position-stage').updateById(data, {
				isCurrentStage: false
			})
		})
	},

	async setUrgentPosition(ctx) {
		const { data } = ctx.request.body;

		await strapi.service('api::positions.positions').updateById(data, {
			isUrgent: true
		})

		const positions = await strapi.entityService.findMany('api::c-position-stage.c-position-stage', {
			populate: {
				position: {
					filters: {
						id: {
							$in: data
						}
					},
				}
			}
		})
		const candidates = positions.filter(x => x.position).map(x => x.id);

		return await strapi.service('api::c-position-stage.c-position-stage').updateById(candidates, {
			isUrgent: true
		})

	},

	async setUrgentStage(ctx) {
		const { data } = ctx.request.body;
		return await strapi.service('api::c-position-stage.c-position-stage').updateById(data, {
			isUrgent: true
		})
	},

	async updateStatus(ctx) {
		const { data } = ctx.request.body;
		const { id } = ctx.params;
		const { stageTrigger, triggerTimeout } = await strapi.entityService.findOne('api::status.status', data.status);
		data.stageChangeTimeStamps = null;
		if (stageTrigger) {
			ctx.params.triggerTimeout = triggerTimeout
			this.updateStage(ctx);
		} else {
			//если статус изменился и не является триггером почистим таймаут, чтобы не создать новые позиции на других этапах
			const { timeoutId } = await strapi.entityService.findOne('api::c-position-stage.c-position-stage', id);
			if (timeoutId) {
				clearTimeout(timeoutId)
			}
		}
		return await super.update(ctx);
	},

	async updateUser(ctx) {
		return await super.update(ctx);
	},

	async updateStage(ctx) {

		const { data } = ctx.request.body || {};
		const { id, triggerTimeout, } = ctx.params;
		let { nextSteps } = ctx.params;


		let timeout = null;

		//получаем текущий этап, позицию, timestamp
		const { position, stage, timeoutId } = await strapi.entityService.findOne('api::c-position-stage.c-position-stage', id, {
			populate: {
				position: true,
				stage: true
			}
		});


		// если timeout уже запущен, то очистим и продолжим
		if (timeoutId) {
			clearTimeout(timeoutId)
		}

		const moveToNextStage = async () => {

			if (!nextSteps) {
				//получаем следующий шаг по графу
				nextSteps = graph.getNextVertex(stage.step);

				//СМОДЕЛИРУЕМ СИТУАЦИЮ ЧТО У ПОЗИЦИИ ЕСТЬ/НЕТ ПЕЧАТИ
				if (!Array.isArray(nextSteps)) {
					nextSteps = nextSteps.hasStamp
				}
			}


			//получаем следующий этап согласно шагу
			nextSteps.forEach(async (step) => {
				const [nextStage] = await strapi.entityService.findMany('api::stage.stage', {
					fields: ['id'],
					filters: {
						step: {
							$eq: step
						}
					},
				});


				//снимаем с текущего этапа
				if (data) {
					data.isCurrentStage = false;
					data.passed = true;
					data.timeoutId = null;
				}


				//найдем позицию на следующем этапе
				const positionAtStages = await strapi.entityService.findMany('api::c-position-stage.c-position-stage', {
					populate: {
						stage: {
							filters: {
								id: {
									$eq: nextStage.id
								}
							}
						},
						position: {
							filters: {
								id: {
									$eq: position.id
								}
							}
						}
					}
				});
				const { id, isUrgent } = positionAtStages.find(x => x.position && x.stage);

				//определим начальный status позиции
				const statuses = await strapi.entityService.findMany('api::status.status', {
					filters: {
						initial: true
					},
					populate: {
						stage: {
							filters: {
								id: {
									$eq: nextStage.id
								}
							}
						}
					}
				})

				const status = statuses.find(x => x.stage)

				//обновляем состояние позиции на след этапе (простави срочность этапа в зависимости от этапа или всей позиции)
				await strapi.entityService.update('api::c-position-stage.c-position-stage',id, {
					data: {
						isCurrentStage: true,
						status: status.id,
						isUrgent: isUrgent || position.isUrgent
					}
				});

				if (data) {
					await super.update(ctx);
				}

			})
		}

		// если в параметрах есть таймаут, то запускаем через таймаут иначе сразу
		if (triggerTimeout) {
			const currentTime = new Date();
			const changeTime = new Date();
			changeTime.setSeconds(changeTime.getSeconds() + triggerTimeout);
			if (data) {
				data.stageChangeTimeStamps = JSON.stringify({
					currentTime: currentTime.getTime(),
					changeTime: changeTime.getTime()
				})
			}
			timeout = setTimeout(moveToNextStage, (triggerTimeout && triggerTimeout * 1000) || 0)
		} else {
			moveToNextStage();
		}



		data && (data.timeoutId = timeout);

		if (data) {
			await super.update(ctx);
		}

	}
}));
