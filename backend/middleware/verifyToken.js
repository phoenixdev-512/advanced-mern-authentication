import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // next(); this will call the next function, wherever it is used.
    const token = req.cookies.token
    try{
        is(!token) return res.status(401).json({success: false, message: "Unauthorized - No token provided"});
        
    } catch (error) {
    }
};