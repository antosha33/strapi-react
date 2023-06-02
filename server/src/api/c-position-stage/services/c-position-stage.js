'use strict';

/**
 * c-position-stage service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::c-position-stage.c-position-stage', ({ strapi }) => ({
	async find(...args) {
		// Calling the default core controller
		const { results, pagination } = await super.find(...args);

		// some custom logic
		results.forEach(result => {
			result.counter = 1;
		});

		return { results, pagination };
	},
}));
