import { makeAutoObservable } from 'mobx';

class Dashbord {

	selectedPositions = [];
	settings = null;
	sort = {};

	constructor() {
		makeAutoObservable(this)
	}

	addPosition(item) {
		const isExist = this.selectedPositions.indexOf(item)
		if (isExist > -1) {
			this.selectedPositions.splice(isExist, 1)
		} else {
			this.selectedPositions.push(item)
		}
	}

	setSort({ path, name }) {
		this.sort = {
			path,
			name,
			correction: this.sort?.correction === 'asc' ? 'desc' : 'asc'
		}
	}

	resetSort() {
		this.sort = {};
	}

	setSettings(settings) {
		this.settings = settings;
	}

	getSelected() {
		return this.selectedPositions;
	}

	clearSelected() {
		this.selectedPositions = [];
	}

	getIsPositionsSelected(id) {
		return this.selectedPositions.indexOf(id) > -1;
	}

}

const dashbord = new Dashbord()

export default dashbord;