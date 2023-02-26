const joi = require("joi");
const statusCode = require('../utils/statusCode')
const validation = joi.object({
     firstName: joi.string().alphanum().min(3).max(25).trim(true),
     lastName: joi.string().alphanum().min(3).max(25).trim(true),
     email: joi.string().email().trim(true).required(),
     password: joi.string().min(8).trim(true).required(),
     phone: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/),
     address: joi.object().keys({
        street: joi.string(),
        zip: joi.number(),
        state: joi.string(),
        country: joi.string()
      })
});
const userSignupValidation = async (req, res, next) => {
	const payload = {
		firstName: req.body.firstName,
        lastName:req.body.lastname,
		email: req.body.email,
		password: req.body.password,
        phone:req.body.phone,
        address:({
            street: req.body.street,
            zip: req.body.zip,
            state: req.body.state,
            country: req.body.country
          })
        };

	const { error } = validation.validate(payload);
	if (error) {
		const message = `Error in User Data : ${error.message}`
        statusCode.errorResponse(res,message)
	} else {
		next();
	}
};
const userSignInValidation = async (req,res, next) => {
    const payload = {
        email:req.body.email,
        password:req.body.password
    };
    const {error} = validation.validate(payload);
    if(error){
        const message = `Error in User Data : ${error.message}`
        statusCode.errorResponse(res,message)
    }
    else{
        next();
    }
}
const updateValidation = joi.object({
    firstName: joi.string().alphanum().min(3).max(25).trim(true),
    lastName: joi.string().alphanum().min(3).max(25).trim(true),
    phone: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/),
    address: joi.object().keys({
       street: joi.string(),
       zip: joi.number(),
       state: joi.string(),
       country: joi.string()
     })
});
const userUpdateValidation = async (req, res, next) => {
	const payload = {
		firstName: req.body.firstName,
        lastName:req.body.lastname,
        phone:req.body.phone,
        address:({
            street: req.body.street,
            zip: req.body.zip,
            state: req.body.state,
            country: req.body.country
          })
        };

	const { error } = updateValidation.validate(payload);
	if (error) {
		const message = `Error in User Data : ${error.message}`
        statusCode.errorResponse(res,message)
	} else {
		next();
	}
};
module.exports = {
    userSignupValidation,
    userSignInValidation,
    userUpdateValidation};