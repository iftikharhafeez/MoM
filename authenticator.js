const { Request: OauthRequest, Response: OauthResponse, ServerError } = require('oauth2-server');

function authorize(req, res, next) {
}

async function requestToken(req, res, next) {
    const oauthRequest = new OauthRequest(req);
    const oauthResponse = new OauthResponse(res);

    const accessToken = await req.sessionData.oauth.token(oauthRequest, oauthResponse);
    res.status(200).json(accessToken);
}

async function authenticate(req, res, next) {
    const oauthRequest = new OauthRequest(req);
    const oauthResponse = new OauthResponse(res);

    try {
        const token = await req.sessionData.oauth.authenticate(oauthRequest, oauthResponse);
        req.user = token.user;
        next();
    }
    catch (error) {
        if (error instanceof ServerError) res.status(error.inner.statusCode).json(error.inner);
        res.status(error.statusCode || 500).json(error);
    }
}


module.exports = {
    authorize,
    authenticate,
    requestToken
}