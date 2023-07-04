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
		//если роли совпадают продолжаем запрос
		if (role === type) {
			await next()
		}
	}
}