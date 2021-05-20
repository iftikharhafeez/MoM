const OAuth2Server = require('oauth2-server');

const loadModels = require('./load_models');

module.exports = (modules) => {
    function load(req, res, next) {
        const models = loadModels(req);
    
        req.sessionData = {
            models
        };

        const oauth = new OAuth2Server({
            model: require('../oauth/model')(modules, req)
        });

        req.sessionData.oauth = oauth;
    
        next();
    }

    return { load }
}