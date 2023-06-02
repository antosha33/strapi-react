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

		if(ctx.query.role){
			const users = await service.findMany(
				'plugin::users-permissions.user',
				{
					...ctx.params,
					populate:{
						role: {
							filters:{
								type: {
									$eq : ctx.query.role
								}
							},
						}
					} 
				}
			);
			ctx.body = users.map(user => sanitizeOutput(user)).filter(x => x.role);
		}else{
			const users = await service.findMany(
				'plugin::users-permissions.user',
				{
					...ctx.params,
					populate:['role']
				}
			);
			ctx.body = users.map(user => sanitizeOutput(user));
		}
	};

	return plugin;
};