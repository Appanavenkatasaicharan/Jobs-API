const {AuthenticationError} = require("../errors/MyErrors");
const jwt = require('jsonwebtoken');

const AuthorizeMiddleware = async (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization||!authorization.startsWith('Bearer ')){
        throw new AuthenticationError("Not authorized to access this route");
    }
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const {userId,name} = decoded;
        req.user = {userId,name}
        next();
    } catch (error) {
        throw new AuthenticationError("Not authorized to access this route")
    }
}

module.exports = AuthorizeMiddleware;