
class Parser {
	constructor(strapi) {
		if(typeof Parser.instance == 'object' ){
			this.strapi = strapi;
			return Parser.instance;
		}

		Parser.instance = this;
		return this;
	}
}



module.exports = Parser;