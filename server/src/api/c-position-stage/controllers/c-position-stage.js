'use strict';

/**
 * c-position-stage controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::c-position-stage.c-position-stage', ({ strapi }) => ({

	async setUrgent(ctx) {
		const { data } = ctx.request.body;

		return await strapi.service('api::c-position-stage.c-position-stage').updateById(data ,{
			isUrgent: true
		})

	},

	async find(ctx) {
		// some custom logic here
		ctx.query = { ...ctx.query, local: 'en' }

		// Calling the default core action
		const { data, meta } = await super.find(ctx);

		return { data, meta };
	},

	async updateStatus(ctx) {
		const { data } = ctx.request.body;
		const { stageTrigger, triggerTimeout } = await strapi.entityService.findOne('api::status.status', data.status);
		data.stageChangeTimeStamps = null;
		if (stageTrigger) {
			ctx.params.triggerTimeout = triggerTimeout
			this.updateStage(ctx);
		}
		return await super.update(ctx);
	},

	async updateStage(ctx) {
		const { data } = ctx.request.body;
		const { id, triggerTimeout } = ctx.params;
		const currentTime = new Date();
		const changeTime = new Date();
		changeTime.setSeconds(changeTime.getSeconds() + triggerTimeout);
		data.stageChangeTimeStamps = JSON.stringify({
			currentTime: currentTime.getTime(),
			changeTime: changeTime.getTime()
		})

		setTimeout(async () => {

			//HARDCODE
			const nextStageID = 46;

			const { stageChangeTimeStamps, position } = await strapi.entityService.findOne('api::c-position-stage.c-position-stage', id, {
				populate: {
					position: true
				}
			});

			//не будем чистить интервал, просто проверим, возможно уже создана позиция на этом stage
			const candidates = await strapi.entityService.findMany('api::c-position-stage.c-position-stage', {
				populate: {
					position: {
						filters: {
							id: {
								$eq: position.id
							}
						},

					},
					stage: {
						filters: {
							id: {
								$eq: nextStageID
							}
						}
					}
				}
			});
			const isExist = candidates.find(x => x.position && x.stage);

			if (stageChangeTimeStamps && !isExist) {
				//снимаем с текущего этапа
				data.isCurrentStage = false;
				//определим начальный status позиции
				const statuses = await strapi.entityService.findMany('api::status.status', {
					filters: {
						initial: true
					},
					populate: {
						stage: {
							filters: {
								id: {
									$eq: nextStageID
								}
							}
						}
					}
				})
				const status = statuses.find(x => x.stage)
				//создаем новою позицию на другом этапе
				await strapi.entityService.create('api::c-position-stage.c-position-stage', {
					data: {
						stage: nextStageID,
						position: position.id,
						status: status.id,
					}
				});
				await super.update(ctx);
			}

		}, (triggerTimeout && triggerTimeout * 1000) || 0)
	}
}));
