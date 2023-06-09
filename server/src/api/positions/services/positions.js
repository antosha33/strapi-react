'use strict';

/**
 * positions service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::positions.positions', ({ strapi }) => ({
	async updateById(ids, data) {
		return await strapi.db.query("api::positions.positions").updateMany({
			where: {
				id: {
					$in: ids
				}
			},
			data: data,
		});
	}
}));
