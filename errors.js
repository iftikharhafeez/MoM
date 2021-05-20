const modules = require("./modules");

class ES6Error extends Error {
    constructor(message, statusCode = 500) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.code = this.constructor.code;
        this.statusCode = statusCode;
    }
}

class UserAlreadyExists extends ES6Error {}
class InvalidUser extends ES6Error {}
class InvalidToken extends ES6Error {}

module.exports = {
    UserAlreadyExists,
    InvalidUser,
    InvalidToken
}