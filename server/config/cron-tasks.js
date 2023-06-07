const Parser = require("../src/modules/parser/parser");
const {url} = require("../api");

console.log

module.exports = {
	parser: {

		// POLLING_TIMEOUT: 120,

		task: ({ strapi }) => {
			const parser = new Parser(strapi);
			parser.setOptions({
				url,
				time: 100,
			});
			parser.getData();
		},
		options: {
			rule: "* */10 * * * *",
		},
	}
};