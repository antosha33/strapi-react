import { makeAutoObservable } from 'mobx';

class Stage {
	currentStage = {};

	constructor() {
		makeAutoObservable(this)
	}

	setCurrentStage(stage) {
		if(stage){
			this.currentStage = stage
		}
	}
}

export default new Stage();