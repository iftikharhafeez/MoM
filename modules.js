const fs = require('fs')
const FlatFile = require('./flatfile_database');

const mongoose = require('mongoose');
module.exports = () => {

    mongoose.connect('mongodb://localhost:27017/meetings', {useNewUrlParser: true});

    const meetings = '/Users/attsopal/Documents/Hypercare/engineering/repos/meetings.txt'
    const users = '/Users/attsopal/Documents/Hypercare/engineering/repos/users.txt'
    const gData = '/Users/attsopal/Documents/Hypercare/engineering/repos/gData.txt'
    if(!fs.existsSync(meetings)){
        fs.writeFileSync(meetings, JSON.stringify([]));
    }
    const meetingsDb = new FlatFile(meetings); 

    if(!fs.existsSync(users)){
        fs.writeFileSync(users, JSON.stringify({}));
    }
    const usersDb = new FlatFile(users); 

    if(!fs.existsSync(gData)){
        fs.writeFileSync(gData, JSON.stringify({}));
    }
    const gDataDb = new FlatFile(gData); 

    return {
        meetingsDb,
        usersDb,
        gDataDb
    }
}