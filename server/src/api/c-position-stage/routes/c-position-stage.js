'use strict';

/**
 * c-position-stage router
 */

// const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
	routes: [
		{
			method: 'POST',
			path: '/c-position-stages/setUrgentPosition',
			handler: 'c-position-stage.setUrgentPosition',
		},
		{
			method: 'PUT',
			path: '/c-position-stages/updateStatus/:id',
			handler: 'c-position-stage.updateStatus',
			config: {
				middlewares: ['api::c-position-stage.role'],
			},
		},
		{
			method: 'PUT',
			path: '/c-position-stages/updateUser/:id',
			handler: 'c-position-stage.updateUser',
			config: {
				middlewares: ['api::c-position-stage.role'],
			},
		},
		{
			method: 'GET',
			path: '/c-position-stages',
			handler: 'c-position-stage.find',
		},

	]
}