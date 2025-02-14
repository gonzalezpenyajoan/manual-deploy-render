import { ENV } from '#core/constants/env.constants.js';
import { verifyJWT } from '#common/helpers/jwt.helpers.js';
export const authenticationMiddleware = async (req, res, next) => {
    try {
        const [, token] = req.cookies.authorization?.split(" ") || [];
        const userSession = await verifyJWT(token, ENV.AUTH_SECRET);
        req.userSession = userSession;
        next();
    }
    catch (error) {
        res.clearCookie('authorization');
        res.sendStatus(401);
    }
};
const isAuthorized = (currentRole, allowedRoles) => Boolean(currentRole) && allowedRoles?.some((role) => currentRole === role);
export const authorizationMiddleware = (allowedRoles) => async (req, res, next) => {
    if (isAuthorized(req.userSession?.role, allowedRoles)) {
        next();
    }
    else {
        res.sendStatus(403);
    }
};
