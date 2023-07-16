"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationValidationMiddleware = void 0;
const authorizationValidationMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.sendStatus(401);
    }
    if (auth !== "Basic YWRtaW46cXdlcnR5")
        return res.sendStatus(401);
    return next();
};
exports.authorizationValidationMiddleware = authorizationValidationMiddleware;
