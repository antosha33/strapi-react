'use strict';

/**
 * c-position-stage controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::c-position-stage.c-position-stage', ({ strapi }) => ({
	// // Method 1: Creating an entirely custom action
	// async exampleAction(ctx) {
	//     try {
	//         ctx.body = 'ok';
	//     } catch (err) {
	//         ctx.body = err;
	//     }
	// },

	// // Method 2: Wrapping a core action (leaves core logic in place)
	// async find(ctx) {
	//     // some custom logic here
	//     ctx.query = { ...ctx.query, local: 'en' }

	//     // Calling the default core action
	//     const { data, meta } = await super.find(ctx);

	//     // some more custom logic
	//     meta.date = Date.now()

	//     return { data, meta };
	// },

	// Method 3: Replacing a core action with proper sanitization
	async find(ctx) {
		// some custom logic here
		ctx.query = { ...ctx.query, local: 'en' }

		// Calling the default core action
		const { data, meta } = await super.find(ctx);



		return { data, meta };
	},

	async update(ctx) {
		// some logic here
		console.log('ctx =>>', ctx);
		const response = await super.update(ctx);
		// some more logic

		return response;
	}
}));
