import jwt from "jsonwebtoken";



export function authUser(req,res,next){
    const token = req.cookies.token
    if (!token){
        return req.status(401).json({
            message:'Unauthorized',
            sucess:false,
            err:'No token provided'
        })
    }

    try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user=decoded
    next()
    }catch(err){
        res.status(401).json({
            message:'Unauthorized',
            sucess:false,
            err:'Invalid token'
        })
    }
}