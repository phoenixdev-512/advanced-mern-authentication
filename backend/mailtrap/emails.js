import { User } from "../models/user.model.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"

        })

        console.log("Email sent successfully", response);
    }   catch(error) {
        console.error('Error sending verification', error);

        throw new Error('Error sending verification email: ${error}');
    };
}

export const sendWelcomeEmail =  async (email, name) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "b6550bcf-5dde-47bc-88f5-4e3970aea64f",
            template_variables: {
      "name": name,
    },
});
    console.log("Welcom Email sent successfully", response);
} catch (error) {
    console.error('Error sending Welcom email', error);

    throw new Error('Error sending Welcom email: ${error}');
}
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

} catch (error) {
    console.error("Forgot password error:", error.message);
    res.status(500).json({ success: false, message: error.message });
}

};
// email.js defines the functions for sending verification and welcome emails using the Mailtrap API. The sendVerificationEmail function takes the email address and verification token as arguments and sends a verification email to the user using the MailtrapClient instance and the VERIFICATION_EMAIL_TEMPLATE.
// The sendWelcomeEmail function takes the email address and name as arguments and sends a welcome email to the user using the MailtrapClient instance and the template_uuid and template_variables.
// The functions catch any errors that occur during the email sending process and log the error message to the console. If an error occurs, an Error object is thrown with the error message.
// The functions are exported to be used in the auth.controller.js file to send verification and welcome emails to users during the signup and email verification processes.
// The email.js file is responsible for defining the functions for sending verification and welcome emails to users using the Mailtrap API. The functions take the necessary parameters, such as the email address, verification token, and name, and use the MailtrapClient instance to send the emails.
