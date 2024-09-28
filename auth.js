const jwt=require('jsonwebtoken');
require('dotenv').config()

function Middleware(req,res,next){
    const token=req.headers.token;
    if(!token){
        return res.status(401).json({msg:"Invalid token"})
    }
   const decoded=jwt.verify(token,process.env.USERPASSKEY)
 
    if(!decoded){
        return res.status(401).json({msg:"Token is not valid"})
    }
    req.id=decoded.id;
    next()
}
module.exports=Middleware;