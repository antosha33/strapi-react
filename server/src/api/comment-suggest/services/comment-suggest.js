'use strict';

/**
 * comment-suggest service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::comment-suggest.comment-suggest');
