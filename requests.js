const url = require('url');
const _ = require('lodash');
const moment = require('moment');
const validator = require('./validator');
const bootstrapFactory = require('./bootstrap/index');


const Errors = require('./errors');
const { authenticate, requestToken } = require('./authenticator');

function throwError(res, error, message) {
  res.status(403).json(new error(403, message));
}

module.exports = function(app, modules){
  // bind object to req
  const bootstrap = bootstrapFactory(modules);

  app.use(bootstrap.load);

  app.get('/home', function(req,res){
    res.send('This page lets you create Minutes of meeting');
  });

  app.post('/users/create', async function(req,res) {
    const userValidationResponse = validator.userValidator(req.body);

    if (!_.isEmpty(userValidationResponse.error)) {
      res.status(403).json(userValidationResponse.error);
      return;
    }

    const existingUser = await req.sessionData.models.userModel.loadUser(req.body.username);

    if (existingUser) {
      throwError(res, Errors.UserAlreadyExists, 'User already exists');
      return;
    }

    await req.sessionData.models.userModel.createUser(req.body);
    console.log('user created successfully');
    res.json(req.body);
  })
  
  app.post('/signin', requestToken);

  app.get('/secure_endpoint', authenticate, (req, res) => {
    res.status(200).json({ success: true });
  })


  app.post('/meetings/create', authenticate, async function(req,res) {
   // console.log('body data', {user :  req.user});
      const validationResponse = validator.meetingValidator(req.body);
      if (!_.isEmpty(validationResponse.error)) {
        res.status(403).json(validationResponse.error);
        return;
      }

      //let meetingsArr = modules.meetingsDb.loadContent();
      let newMeeting = validationResponse.value; 
      for(const user of newMeeting.attendees){
        const existingUser = await req.sessionData.models.userModel.loadUser(user);
       // console.log(existingUser);
        if(!existingUser){
          throwError(res, Errors.InvalidUser, 'attandee ' + user + ' dosent exists');
      return;
        }
      }
      for(const user of newMeeting.details){
        const existingUser = await req.sessionData.models.userModel.loadUser(user.owner);
        //console.log(check);
        //console.log(user.owner);
        if(!existingUser){
          throwError(res, Errors.InvalidUser, 'username ' + user.owner + ' dosent exists');
      return;
        }
      }

      newMeeting.owner = req.user.username;
      req.sessionData.models.meetingModel.createMeeting(newMeeting);
      //meetingsArr.push(newMeeting);
      //modules.meetingsDb.writeContent(meetingsArr);

      // if (data === 'object' && data !== null) {
      //   console.log(data)
      // } else {
      //   let meetingsArr = modules.meetingsDb.loadContent();
      //   meetingsArr.push(validationResponse.value);
      //   modules.meetingsDb.writeContent(meetingsArr);
      // }
    /**
     * - load existing content from database
     * - append to content
     * - write new content to database
     */
    // modules.meetingsDb.writeContent(meetings)
    
    res.json(req.body);
  });

  app.get('/meetings/list', authenticate, async (req,res) => {
    console.log("requesting list of meetings");
    //const meetings = modules.meetingsDb.loadContent();
    //var query = req.query;
    //let result = meetings.filter(meeting => meeting.owner.username === req.user.username);
    //let result = await req.sessionData.models.meetingModel.loadMeetingsForOwner(req.user.username);
    

    if(_.isEmpty(req.query)) {

      let meetings = await req.sessionData.models.meetingModel.loadMeetingsForOwner(req.user.username)
      //console.log(meetings);

      for(const meeting of meetings){
        for(let i=0 ; i < meeting.attendees.length; i++){
          let userDetail = await req.sessionData.models.userModel.loadUser(meeting.attendees[i]);
          const userData = _.pick(userDetail,['firstName','lastName','title', 'username']);
          if(meeting.attendees[i] === meeting.owner){
            meeting.owner = userData;
          }

          meeting.attendees[i] = userData;
        }
      }
      res.json(meetings);

      console.log('triggered');
      return;
    }
    if(req.query.attendee){
      console.log(req.query.attendee);
      res.json(await req.sessionData.models.meetingModel.loadMeetingsUsingFilter(req.user.username, req.query.attendee));
      return;
    }

  // if owner_firstname is defined filter by owner firstname
    // if(query.owner_firstname){
    //   result = result.filter(meeting => _.toLower(meeting.owner.firstName) === _.toLower(query.owner_firstname));
    // }
    // if(query.owner_lastname){
    //   result = result.filter(meeting => meeting.owner.lastName === query.owner_lastname);
    // }
    if(query.attendee_firstname){
      result = result.filter((meeting) => {
        return meeting.attendees.find(at => at.firstName === query.attendee_firstname) !== undefined;
      });
    }
    if(query.attendee_lastname){
      result = result.filter((meeting) => meeting.attendees.lastName === query.attendee_lastname);
    }
    if(query.starttime){
      result = result.filter(meeting => moment(meeting.startTime).isAfter(query.starttime));
    }
    if(query.endtime){
      result = result.filter(meeting => moment(meeting.startTime).isBefore(query.endtime));
    }
    res.send(result);

  // TODO: if owner_lastname is defined filter by owner lastname


  // TODO: 

 

    
    //console.log(query);
  });






  app.delete('/home', function(req,res){

  });
}
