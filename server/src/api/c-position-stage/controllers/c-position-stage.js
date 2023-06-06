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

		const { data } = ctx.request.body;
		const { id } = ctx.params;
		const { stageTrigger, triggerTimeout } = await strapi.entityService.findOne('api::status.status', data.status);

		data.stageChangeTimeStamps = null;

		if (stageTrigger) {
			const currentTime = new Date();
			const changeTime = new Date();
			changeTime.setSeconds(changeTime.getSeconds() + triggerTimeout);
			data.stageChangeTimeStamps = JSON.stringify({
				currentTime: currentTime.getTime(),
				changeTime: changeTime.getTime()
			})
			setTimeout(async () => {
				const { stageChangeTimeStamps } = await strapi.entityService.findOne('api::c-position-stage.c-position-stage', id);
				if (stageChangeTimeStamps) {
					data.isCurrentStage = false;
					await super.update(ctx);
				}
			}, (triggerTimeout && triggerTimeout * 1000) || 0)
		}

		return await super.update(ctx);
	}
}));
