const {StatusCodes} = require('http-status-codes');
const CustomAPIError = require('../errors/CustomAPIError')

const errorHandlingMiddleware = (err,req,res,next)=>{
    console.log(err);
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg:err.message});
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong.Please try again...');
}

module.exports = errorHandlingMiddleware