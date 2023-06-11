import { makeAutoObservable } from 'mobx';

class Dashbord {

	selectedPositions = [];
	settings = null;


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

	setSettings(settings){
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