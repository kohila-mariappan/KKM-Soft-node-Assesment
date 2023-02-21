const joi = require("joi");
const statusCode = require('../utils/statusCode')
const validation = joi.object({
     name: joi.string().alphanum().min(3).max(25).trim(true),
     email: joi.string().email().trim(true).required(),
     password: joi.string().min(8).trim(true).required()
});
const userSignupValidation = async (req, res, next) => {
	const payload = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
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
module.exports = {
    userSignupValidation,
    userSignInValidation};