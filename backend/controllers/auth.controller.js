import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const signup = async (req, res) => {
    const {email, password, name} = req.body;
    try {
        if (!email || !password || !name) {
            throw new Error('Please fill in all fields');
    }
    const userAlreadyExists = await User.findOne({email});
    console.log("userAlreadyExists", userAlreadyExists);
    if(userAlreadyExists) {
        return res.status(400).json({success:false, message: "User already exists"});
    }

    //1234656 = 1!@@#$34
    //securtiy coz its encrypted
    const hashedPassword =  await bcryptjs.hash(password,10);
    const verificationToken = Math.floor(100000 + Math.random() * 9000).toString();
    const user =  new User({
        email,
        password: hashedPassword,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, //24 hours
    })

    await user.save();

    //jwt
    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user:{
            ...user._doc,
            password: undefined
        },
    });
    generateTokenAndSetCookie(res,user._id);

    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};
export const login = async (req, res) => {
    res.send("login route");
}

export const logout = async (req, res) => {
    res.send("logout route");
}