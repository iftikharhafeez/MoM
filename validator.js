const Joi = require('joi');  

const meetingValidator = function(obj){
    const startTimeSchema = Joi.string().isoDate().required();
    const attendeeSchema = Joi.array().required().items(Joi.string());
    const meetingDetailSchema = Joi.array().required().items(Joi.object().keys({
        topic : Joi.string().required(),
        summaryOfDiscussion : Joi.string().required(),
        decision : Joi.string().required(),
        action : Joi.string().required(),
        owner : Joi.string().required()
    }));
    const meetingSchema = Joi.object().keys({
        startTime: startTimeSchema,
        attendees : attendeeSchema,
        details : meetingDetailSchema
    });
    return  meetingSchema.validate(obj);
};

const userValidator = function(obj){
    const userSchema = Joi.object().keys({
        username : Joi.string().required(),
        password : Joi.string().required(),
        firstName : Joi.string().required(),
        lastName : Joi.string().required(),
        title : Joi.string().required()
    });
    return userSchema.validate(obj);
};

module.exports = {
    meetingValidator,
    userValidator
} 