import {makeAutoObservable} from 'mobx';

class Users {
    users = [];
    currentUser = {};

    constructor() {
        makeAutoObservable(this)
    }

    setCurrentUser(user) {
        this.currentUser = user
    }
}

export default new Users();