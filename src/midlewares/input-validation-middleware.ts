import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

const errorFormatter = ({msg, path}: any) => {
    return {
        message: msg,
        field:path
    }
}


export const  inputValidationMiddleware = (req: Request, res:Response, next: NextFunction) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const errorsMessages = errors.array({ onlyFirstError: true }).map(elem => errorFormatter(elem));
         res.status(400).json({errorsMessages})
    } else {
        next()
    }
}