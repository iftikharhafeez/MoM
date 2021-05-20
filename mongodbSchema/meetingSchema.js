const mongoose = require('mongoose');
const { Schema } = mongoose;

const meetingDetailSchema = new Schema({
    topic : String,
    summaryOfDiscussion : String,
    decision : String,
    action : String,
    owner : String
});

const meetingSchema = new Schema({
    owner : String,
    startTime : { type: Date, default: Date.now },
    attendees : [String],
    details: { type: [meetingDetailSchema] }
});

const Meeting = new mongoose.model("meetings", meetingSchema);

module.exports = Meeting;
