const oauthToken = require('../mongodbSchema/oauthTokenSchema')

class OauthTokenModel {
    constructor(request) {
        this.request = request;
    }

    async loadToken(accessToken) {
        const token = await oauthToken.findOne({ accessToken });
        return token;
    }

    async createToken(data){
        await oauthToken.create(data);
    }
}

module.exports = OauthTokenModel;