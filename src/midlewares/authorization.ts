import {NextFunction, Request, Response} from "express";
import {header, validationResult} from "express-validator";
export  const authorizationValidationMiddleware = (req: Request, res:Response, next: NextFunction) => {
    const  auth = req.headers.authorization
    if(!auth) {
        return res.sendStatus(401)
    }
    if (auth !== "Basic YWRtaW46cXdlcnR5") return  res.sendStatus(401)
    return next()
}