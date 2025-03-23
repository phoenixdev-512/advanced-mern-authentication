import express from 'express';
import { login, logout, signup, verifyEmail, forgotPassword } from '../controllers/auth.controller.js';

const router =  express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

export default router;
// auth.route.js main function is to define the routes for the authentication endpoints.
//
// The auth.route.js file is responsible for defining the routes for the authentication endpoints. It imports the necessary functions from the auth.controller.js file and uses the express.Router() method to define the routes for the signup, login, logout, verify-email, and forgot-password endpoints.
// The router.post() method is used to define the routes for the POST requests to the signup,
// login, logout, verify-email, and forgot-password endpoints. The signup function is called when a
// POST request is made to the /signup endpoint, the login function is called when a POST request
