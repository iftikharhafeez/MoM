const fs = require('fs')
const FlatFile = require('./flatfile_database');

const mongoose = require('mongoose');
module.exports = () => {

    mongoose.connect('mongodb://localhost:27017/meetings', {
        user: 'iftikhar',
        pass: process.env.mongo_pass,
        useNewUrlParser: true
    });

    return {};
}