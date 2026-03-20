import Joi from "joi";
import { checkBody } from "../utils/common.utils.js";
import jwt from "jsonwebtoken";
import { Users } from "../models/index.js";

export function validateUserCreation(req, res, next) {
    const userRegistrationSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().min(8).required(),
    });
    checkBody(userRegistrationSchema, req.body, res, next);
}

export function validateUserLogin(req, res, next) {
    const userLoginSchema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
    });
    checkBody(userLoginSchema, req.body, res, next);
}

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization token missing or invalid"});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error) {
        return res.status(401).json({ error: "Invalid or expired token"});
    }
}

// export function isAllowed(requiredRole) {
//     return async (req, res, next) => {
//         const user = await Users.findByPk(req.user.user_id, {
//             include: "role"
//         });
//         if(!user) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         if(user.role.name === "admin" || user.role.name === requiredRole) {
//             return next();
//         }
//         return res.status(403).json({ error: "Access denied" });
//     }
// }