const { StatusCodes } = require('http-status-codes');
const User = require('../models/users');
const { BadRequestError, AuthenticationError } = require('../errors/MyErrors');

const login = async (req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        throw new BadRequestError("Please provide email and password")
    }
    const user = await User.findOne({email});
    if(!user){
        throw new AuthenticationError('Inavalid credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new AuthenticationError('Inavalid credentials');
    }
    const token = await user.createJWT();
    res.status(StatusCodes.OK).json({
        user:{name:user.name},
        token
    })
}

const register = async (req,res)=>{
    const user = await User.create({...req.body});
    const token = await user.createJWT();
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token});
}

module.exports = {
    login,
    register
}