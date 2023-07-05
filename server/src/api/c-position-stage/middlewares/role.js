module.exports = (config, { strapi }) => {
	return async (ctx, next) => {
		// получаем stageId
		const { id } = ctx.request.params;
		// получаем текущую роль пользователя
		const { type } = ctx.state.user.role;
		// получаем основную роль текущей позиции
		const { stage: { role } } = await strapi.entityService.findOne('api::c-position-stage.c-position-stage', id, {
			populate: {
				stage: true
			}
		});

		//если роли совпадают или у пользователя неограниченный доступ то продолжаем запрос
		if (role === type || type === 'master') {
			await next()
		}
	}
}