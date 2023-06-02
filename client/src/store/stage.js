import { makeAutoObservable } from 'mobx';

class Stage {
	currentStage = {};

	constructor() {
		makeAutoObservable(this)
	}

	setCurrentStage(stage) {
		console.log(stage)
		this.currentStage = stage
	}
}

export default new Stage();