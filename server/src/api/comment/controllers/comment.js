'use strict';

/**
 * comment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comment.comment', ({ strapi }) => ({
	async create(ctx) {

		const { roleOwner, nameOwner, positionId, stageId, comment, urgentStage } = ctx.request.body.data;

		//найдем позицию на нужном этапе
		const positionAtStages = await strapi.entityService.findMany('api::c-position-stage.c-position-stage', {
			populate: {
				stage: {
					filters: {
						id: {
							$eq: stageId
						}
					}
				},
				position: {
					filters: {
						id: {
							$eq: positionId
						}
					}
				}
			}
		});
		const { id } = positionAtStages.find(x => x.position && x.stage);

		//если есть флаг, сделаем этап сроынм 
		if(urgentStage){
			await strapi.service('api::c-position-stage.c-position-stage').updateById([id], {
				isUrgent: true
			})
		}

		// создадим комментарий
		return await strapi.entityService.create('api::comment.comment', {
			data: {
				comment,
				c_position_stage: id,
				roleOwner,
				nameOwner
			}
		});

	}
}));