const Parser = require("../src/modules/parser/parser");
const { url } = require("../api");


module.exports = {
	parser: {
		task: ({ strapi }) => {
			const parser = new Parser(strapi);
			parser.setOptions({
				url,
				time: 1440,
			});
			parser.getData();
		},
		options: {
			rule: "*/2 * * * * ",
		},
	}
};