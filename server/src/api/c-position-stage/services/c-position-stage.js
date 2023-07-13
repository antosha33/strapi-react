'use strict';

/**
 * c-position-stage service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::c-position-stage.c-position-stage', ({ strapi }) => ({
	async updateById(ids, data) {
		return await strapi.db.query("api::c-position-stage.c-position-stage").updateMany({
			where: {
				id: {
					$in: ids
				}
			},
			data,
		});
	}
}));
