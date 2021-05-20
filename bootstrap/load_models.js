const Meetings = require('../models/meetings');
const OAuthToken = require('../models/oauthToken');
const Users = require('../models/users');


module.exports = (request) => {

    const meetingModel = new Meetings(request);
    const oauthTokenModel = new OAuthToken(request);
    const userModel = new Users(request);

    return{
        meetingModel,
        oauthTokenModel,
        userModel
    }
    
}