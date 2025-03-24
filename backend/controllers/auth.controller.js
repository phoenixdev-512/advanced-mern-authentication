import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail } from '../mailtrap/emails.js';
import { sendResetPasswordEmail } from '../mailtrap/emails.js';
import { sendWelcomeEmail } from '../mailtrap/emails.js';
import crypto from 'crypto';

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

export const forgotPassword = async (res, req) => {
    const {email} = req.body;
  try {
    const user = await User.findOne({email});

    if(!user) {
        return res.status(400).json({ success: false, message: "User not found"});
  }
    // Generate the token
    const resetToken =  crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

    await user.save();

    //send User email
    await sendResetPasswordEmail(user.email, '${process.env.CLIENT_URL}/reset-password?token=${resetToken}');

    res.status(200).json({ success: true, message: "Password reset email sent to your email address"});

} catch (error) {
    console.error("Forgot password error:", error.message);
    res.status(500).json({ success: false, message: error.message });
}
};
// The code above is a controller that handles the authentication logic

// still need to implement the reset password function
// the process of adding the reset password function is similar to the verification email function
// the only difference is the token and the expiration time
// the token is generated randomly and the expiration time is set to 1 hour
// the user will be able to reset the password only if the token is valid and not expired


