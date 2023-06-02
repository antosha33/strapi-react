import { makeAutoObservable } from 'mobx';

class Stage {
    currentStage = null;

    constructor() {
        makeAutoObservable(this)
    }

    setCurrentStage(id) {
        this.currentStage = id
    }
}

export default new Stage();