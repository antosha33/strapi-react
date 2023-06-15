import { makeAutoObservable } from 'mobx';

class Dashbord {

	selectedPositions = [];
	settings = null;
	sort = {};

	constructor() {
		makeAutoObservable(this)
	}

	addPosition(id) {
		const isExist = this.selectedPositions.indexOf(id);
		if (isExist > -1) {
			this.selectedPositions.splice(isExist, 1)
		} else {
			this.selectedPositions.push(id)
		}
	}

	setSort({ path, name }) {
		this.sort = {
			path,
			name,
			correction: this.sort?.correction == 'asc' ? 'desc' : 'asc'
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

export default new Dashbord();