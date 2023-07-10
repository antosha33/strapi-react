const Parser = require("../src/modules/parser/parser");
const { url } = require("../api");


module.exports = {
	parser: {
		task: ({ strapi }) => {
			const parser = new Parser(strapi);
			parser.setOptions({
				url,
				time: 10080,
			});
			parser.getData();
		},
		options: {
			rule: "*/1 * * * * ",
		},
	},
	closePositions: {
		task: async ({ strapi }) => {
			//получим все  этапы для которых характерен данный функционал
			const stages = await strapi.entityService.findMany('api::stage.stage', {
				filters: {
					step: [10, 12],
				},
				populate: {
					c_position_stages: {
						filters: {
							isCurrentStage: {
								$eq: true
							}
						},
						populate: {
							position: true,
						}
					},
				}
			});

			// получим позиции
			const positions = stages.reduce((acc, item) => {
				acc.push(...item.c_position_stages)
				return acc;
			}, [])

			if (positions.length) {
				//получим конечный этап 
				const [{ id }] = await strapi.entityService.findMany('api::stage.stage', {
					filters: {
						endStage: {
							$eq: true
						}
					},
					populate: {
						c_position_stages: true,
						position: true,
					}
				});
				//определим начальный status этапа
				const statuses = await strapi.entityService.findMany('api::status.status', {
					filters: {
						initial: true
					},
					populate: {
						stage: {
							filters: {
								id: {
									$eq: id
								}
							}
						}
					}
				})
				const status = statuses.find(x => x.stage)
				positions.forEach(async (x) => {
					//создаем новою позицию на конечном этапе
					await strapi.entityService.create('api::c-position-stage.c-position-stage', {
						data: {
							stage: id,
							position: x.position.id,
							status: status?.id,
							isUrgent: x.position.isUrgent
						}
					});
					//снимаем позицию с текущего этапа
					await strapi.service('api::c-position-stage.c-position-stage').updateById([x.id], {
						isCurrentStage: false
					})
				})
			}
		},
		options: {
			rule: "*/1 * * * * ",
		},
	}
};