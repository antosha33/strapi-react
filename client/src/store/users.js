import { makeAutoObservable } from 'mobx';

class Users {
	users = [];
	currentUser = {};

	constructor() {
		makeAutoObservable(this)
	}

	setCurrentUser(user) {
		this.currentUser = user;
	}

	setUsers(users) {
		this.users = users;
	}
}

const users = new Users();

export default users;