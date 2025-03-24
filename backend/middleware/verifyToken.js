import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    next(); //this will call the next function, wherever it is used.
}