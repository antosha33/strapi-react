const GRAPH = {
	1: [2],
	2: [3],
	3: {
		hasStamp : [4],
		noStamp: [7, 8]
	},
	4: [5],
	5: [6],
	6: [7, 8],
	7: [10],
	8: [10]
}

class Graph {
	constructor(strapi) {
		if (typeof Graph.instance == 'object') {
			return Graph.instance;
		}
		Graph.instance = this;
		return this;
	}
}

Graph.getNextVertex = (intput) => {
	return GRAPH[intput];
}

module.exports = Graph;