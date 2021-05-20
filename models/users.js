const User = require('../mongodbSchema/userSchema')

class UserModel {
    constructor(request) {
        this.request = request;
    }

    async loadUser(username) {
        const user = await User.findOne({ username });
        return user;
    }

    async createUser(data){
        await User.create(data);
    }
}

module.exports = UserModel;