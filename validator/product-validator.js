const joi = require("joi");
const statusCode = require('../utils/statusCode')
const validation = joi.object({
     productName: joi.string().alphanum().min(3).max(25).trim(true).required(),
     price: joi.number().integer().required(),
     quantity: joi.number().integer().required(),
    active: joi.boolean().default(true),
});
const addProduct = async (req, res, next) => {
	const payload = {
		productName: req.body.productName,
		price: req.body.price,
		quantity: req.body.quantity,
        active:req.body.active
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
    addProduct,
    userSignInValidation};