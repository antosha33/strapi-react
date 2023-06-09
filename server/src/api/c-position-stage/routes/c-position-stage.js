'use strict';

/**
 * c-position-stage router
 */

// const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
	routes: [
		{ // Path defined with an URL parameter
			method: 'POST',
			path: '/c-position-stages/setUrgent',
			handler: 'c-position-stage.setUrgent',
		},
		{ // Path defined with an URL parameter
			method: 'PUT',
			path: '/c-position-stages/updateStatus/:id',
			handler: 'c-position-stage.updateStatus',
		},
		{ // Path defined with an URL parameter
			method: 'PUT',
			path: '/c-position-stages/:id',
			handler: 'c-position-stage.update',
		},
		{ // Path defined with an URL parameter
			method: 'GET',
			path: '/c-position-stages',
			handler: 'c-position-stage.find',
		},
	]
}