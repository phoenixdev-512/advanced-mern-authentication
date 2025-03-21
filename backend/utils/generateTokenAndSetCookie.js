import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userID) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET,{
        expiresIn: '7d',
    })
 res.cookie("token", token, {
    httpOnly: true, //cookie cannot be accessed from .js (avoids XSS attack)
    secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //prevents CSRF attack
        maxAge: 7 * 24 * 60 * 60 * 1000,
 });
 
 return token;
};