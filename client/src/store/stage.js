import { makeAutoObservable } from 'mobx';

class Stage {
	currentStage = {};
	stages=[];

	constructor() {
		makeAutoObservable(this)
	}

	setCurrentStage(stage) {
		if(stage){
			this.currentStage = stage
		}
	}
	setStages(stages) {
		if(stages.length){
			this.stages = stages
		}
	}
}

export default new Stage();