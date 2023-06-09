const jwt = require("jsonwebtoken");
const usermodel= require("../model/AdminModel");
const userdb = usermodel.admindb;
const auth = async(req,res,next)=>{
    try {
        const token = req.headers['token'];
        const verifyUser= jwt.verify(token,process.env.JWT_SECERATE_KEY);
        const user = await userdb.findOne({_id:verifyUser._id});
        req.token = token;
        req.user = user;


        next();
        
    } catch (err) {
        return res .status(400).json("Access Denied")
        
    }
}

module.exports = auth;