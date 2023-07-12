module.exports = (config, { strapi }) => {
	return async (ctx, next) => {

		const service = strapi.entityService;

		// получаем stageId
		const { id } = ctx.request.params;
		// получаем текущую роль пользователя
		const { type } = ctx.state.user.role;
		// получаем основную роль текущей позиции
		const { stage } = await service.findOne('api::c-position-stage.c-position-stage', id, {
			populate: {
				stage: {
					populate: ['m_role']
				}
			}
		});
		//получаем список доступных кастомных ролей
		const { m_roles } = await strapi.entityService.findOne(
			'plugin::users-permissions.user',
			ctx.state.user.id,
			{ populate: ['m_roles'] }
		);
		//если роли совпадают или у пользователя неограниченный доступ, то продолжаем запрос
		if (m_roles.find(x => x.id === stage.m_role?.id) || m_roles.find(x => x.godmod)) {
			await next()
		} else {
			return ctx.forbidden('wrong role');
		}
	}
}