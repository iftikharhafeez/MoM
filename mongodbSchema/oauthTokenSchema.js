const mongoose = require('mongoose');
const { Schema } = mongoose;

const oauthTokenSchema = new Schema({
    accessToken : String,
    refreshToken : String,
    accessTokenExpiresAt : Date,
    refreshTokenExpiresAt: Date,
    clientId : String,
    userId : String
});

const OauthToken = new mongoose.model("oauth_tokens", oauthTokenSchema);

module.exports = OauthToken;