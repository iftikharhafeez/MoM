const _ = require('lodash');
const moment = require('moment');
const Errors = require('../errors')

const CLIENT_ID = "democlient";
const CLIENT_SECRET = "democlientsecret";


module.exports = (modules, request) => {

    async function getAccessToken(accessToken) {
      //  const token = modules.gDataDb.loadContent();
        const storedToken = await request.sessionData.models.oauthTokenModel.loadToken(accessToken);
      //  const storedToken = token[accessToken];
        if(!storedToken) throw new Errors.InvalidToken('Invalid Token', 404);
        //const usersDict = modules.usersDb.loadContent();
        const user = await request.sessionData.models.userModel.loadUser(storedToken.userId);
        
       // const user = usersDict[storedToken.userId];

        const client = {
            id: CLIENT_ID,
            redirectUris: ["https://localhost:3000"],
            grants: ["password"],
            accessTokenLifetime: 3600,
            refreshTokenLifetime: 86400
        }

        storedToken.client = client;
        storedToken.user = user;
        storedToken.accessTokenExpiresAt = moment(storedToken.accessTokenExpiresAt).toDate();
        storedToken.refreshTokenExpiresAt = moment(storedToken.refreshTokenExpiresAt).toDate();

        return storedToken;

    }


    async function getClient(clientId, clientSecret) {
        if (clientId !== CLIENT_ID || clientSecret !== CLIENT_SECRET) {
            return null
        }

        return {
            id: clientId,
            redirectUris: ["https://localhost:3000"],
            grants: ["password"],
            accessTokenLifetime: 3600,
            refreshTokenLifetime: 86400
        }
    }

    async function getUser(username, password){
        //console.log({ username, password }, 'User credentials');
        // const usersDict = modules.usersDb.loadContent();
        const storedUser = await request.sessionData.models.userModel.loadUser(username);
        // const storedUser = usersDict[username];

        // console.log({ usersDict }, 'Stored user');


        if (!storedUser) return null;
        if (storedUser.password !== password) return null;

        storedUser.password = null
        return storedUser
    }

    async function saveToken(token, client, user){
        //const data = modules.gDataDb.loadContent();

        const newToken = {
            accessToken : token.accessToken,
            refreshToken : token.refreshToken,
            accessTokenExpiresAt : token.accessTokenExpiresAt,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            clientId : client.id,
            userId : user.username
        };

        //data[token.accessToken] = newToken;
        await request.sessionData.models.oauthTokenModel.createToken(newToken)
        //modules.gDataDb.writeContent(data);

        const tokenData = _.pick(newToken, ['accessToken', 'refreshToken', 'accessTokenExpiresAt', 'refreshTokenExpiresAt']);
        tokenData.client = client;
        tokenData.user = user;

        console.log({ tokenData }, 'Token data');

        return tokenData;
    }
    
    async function validateScope(user, client, scope){
    }

    async function verifyScope(accessToken, scope) {
        return true;
    }



    return {
        getAccessToken,
        getClient,
        getUser,
        saveToken
        //validateScope
    }
}