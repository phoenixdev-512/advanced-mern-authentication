import { User } from "../models/user.model.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
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

export const sendResetPasswordEmail = async (email, resetURL) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        });
    } catch (error) {
        console.error('Error sending password reset email', error);
        throw new Error('Error sending password reset email: ${error}');
    }
};

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });

        console.log("Password reset success email sent successfully", response);
    } catch (error) {
        console.error('Error sending password reset success email', error);
        throw new Error('Error sending password reset success email: ${error}');
    }
};
// The sendVerificationEmail function takes the email address and verification token as arguments and sends a verification email to the user using the MailtrapClient instance and the VERIFICATION_EMAIL_TEMPLATE.;
// email.js defines the functions for sending verification and welcome emails using the Mailtrap API. The sendVerificationEmail function takes the email address and verification token as arguments and sends a verification email to the user using the MailtrapClient instance and the VERIFICATION_EMAIL_TEMPLATE.
// The sendWelcomeEmail function takes the email address and name as arguments and sends a welcome email to the user using the MailtrapClient instance and the template_uuid and template_variables.
// The functions catch any errors that occur during the email sending process and log the error message to the console. If an error occurs, an Error object is thrown with the error message.
// The functions are exported to be used in the auth.controller.js file to send verification and welcome emails to users during the signup and email verification processes.
// The email.js file is responsible for defining the functions for sending verification and welcome emails to users using the Mailtrap API. The functions take the necessary parameters, such as the email address, verification token, and name, and use the MailtrapClient instance to send the emails.
