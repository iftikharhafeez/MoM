const _ = require('lodash');

const Meetings = require('../mongodbSchema/meetingSchema')

function createMeetingObject(meetingData) {
    return _.pick(meetingData, ['attendees', 'details', 'startTime', 'owner']);
}

class MeetingModel {
    constructor(request) {
        this.request = request;
    }

    async loadMeetingsForOwner(owner) {
        const meetings = await Meetings.find({ owner });
        return _.map(meetings, createMeetingObject);
    }

    async loadMeetingsUsingFilter(owner, attendees) {
        const meetings = await Meetings.find({owner , attendees });
        return _.map(meetings, createMeetingObject);
    }

    async createMeeting(data){
        await Meetings.create(data);
    }
}

module.exports = MeetingModel;