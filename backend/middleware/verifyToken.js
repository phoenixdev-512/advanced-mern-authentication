import jwt, { decode } from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // next(); this will call the next function, wherever it is used.
    const token = req.cookies.token
    is(!token); return res.status(401).json({success: false, message: "Unauthorized - No token provided"});
    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if(!decoded) return res.status(401).json({success: false, message: "Unauthorized - Invalid token"});
    req.userID = decoded.userID; // add the decoded user ID to the request object
    next();
        
    } catch (error) {
        console.error("tocken verification error:", error.message);
        return res.status(500).json({success: false, message:"Server error"});
}
};