import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail } from '../mailtrap/emails.js';
import { sendWelcomeEmail } from '../mailtrap/emails.js';

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: 'Please fill in all fields' });
        }

        const lowerCaseEmail = email.toLowerCase();  // Ensure consistency
        console.log("Checking for user:", lowerCaseEmail);

        const userAlreadyExists = await User.findOne({ email: lowerCaseEmail });
        console.log("User found:", userAlreadyExists ? "Yes" : "No");

        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 9000).toString();

        const user = new User({
            email: lowerCaseEmail,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        });

        await user.save();

        // Generate token & set cookie
        generateTokenAndSetCookie(res, user._id);

        await sendVerificationEmail(user.email, verificationToken)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined // Do not return password in response
            },
        });

    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    //1 2 3 4 5 6 7 8
    const {code} = req.body;
    try{
        const user = await User.findOne( {
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        })

        if(!user) {
            return res.status(400).json({success: false, message: "Invalid or expired verification code"})
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
            });

    } catch (error) {
        console.error("Email verification error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials "});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        generateTokenAndSetCookie(res, user._id);
        
        user.lastlogin = Date.now();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in Successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!userAlreadyExists) {
            res.status(500).json({success: false, message: error .message });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Reset link sent successfully",
            });
        }
    } catch (error) {
        console.error("Error in Resetting Password");
        res.status(500)
    }
}

