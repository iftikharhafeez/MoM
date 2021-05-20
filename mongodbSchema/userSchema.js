const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username : String,
    password : String,
    firstName : String,
    lastName : String,
    title : String
});

const User = mongoose.model("users", userSchema);

module.exports = User;