module.exports = plugin => {
	const sanitizeOutput = (user) => {
		const {
			password, resetPasswordToken, confirmationToken, ...sanitizedUser
		} = user; // be careful, you need to omit other private attributes yourself
		return sanitizedUser;
	};

	plugin.controllers.user.me = async (ctx) => {

		if (!ctx.state.user) {
			return ctx.unauthorized();
		}
		const user = await strapi.entityService.findOne(
			'plugin::users-permissions.user',
			ctx.state.user.id,
			{ populate: ['role'] }
		);

		ctx.body = sanitizeOutput(user);
	};

	plugin.controllers.user.find = async (ctx) => {

		const service = strapi.entityService;

		if (ctx.query.role) {
			const users = await service.findMany(
				'plugin::users-permissions.user',
				{
					...ctx.params,
					populate: {
						role: {
							filters: {
								type: {
									$eq: ctx.query.role
								}
							},
						},
						m_roles: true
					}
				}
			);
			ctx.body = users.map(user => sanitizeOutput(user)).filter(x => x.role);
		} else {
			const users = await service.findMany(
				'plugin::users-permissions.user',
				{
					...ctx.params,
					populate: ['role', 'm_roles']
				}
			);
			ctx.body = users.map(user => sanitizeOutput(user));
		}
	};

	plugin.routes["content-api"].routes.push(
		{
			method: "PUT",
			path: "/user/update",
			handler: "user.update",
			config: {
				prefix: "",
				policies: []
			}
		}
	);

	plugin.controllers.user.update = async (ctx) => {
		await strapi.query('plugin::users-permissions.user').update({
			where: { id: ctx.state.user.id },
			data: ctx.request.body
		}).then((res) => {
			ctx.response.status = 200;
		})
	}

	return plugin;
};