import jwt from "jsonwebtoken"
import { createError } from "./error.js";

export const varifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not Authenticated!"));
    }

    jwt.verify(token,process.env.JWT,(err,user) => {
        if(err){
            return next(createError(403,"You Token is not valid"));
        }
        req.user = user;
        next()
    })
}

export const verifyUser = (req,res,next) => {

    
    varifyToken(req,res,next, () => {
        
        if(req.user.id === req.params.id || req.user.isAdmin){
            
            next()
        }else{
            return next(createError(403,"You are not autotized"))
        }
        }

    )
}
export const verifyAdmin = (req,res,next) => {
    varifyToken(req,res, next,() => {
        if(req.user.isAdmin){
            next();
        }else{
             return next(createError(403,"You are not Adimn "))
        }
        }

    )
}