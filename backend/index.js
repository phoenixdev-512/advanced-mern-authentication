import express from 'express';
import connectDB from './db/connectDB.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();
const PORT= process.env.PORT || 5000;

app.use(express.json()); //allows us to parse incoming requests: req.body
app.use(cookieParser()); //allows us to parse cookies

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port ', PORT);
});
// index.js is the main entry point of the backend application. It imports the necessary modules and files, such as express, connectDB, dotenv, and authRoutes, and sets up the express application by creating an instance of the express module and defining the PORT variable.
// The app.use() method is used to set up middleware for the express application. The express.json() middleware is used to parse incoming requests with JSON payloads, allowing the application to access the request body using req.body.
// The app.use() method is also used to define the routes for the authentication endpoints by using the /api/auth prefix for the authRoutes. The authRoutes are defined in the auth.route.js file and contain the routes for the signup, login, logout, verify-email, and forgot-password endpoints.
// The app.listen() method is used to start the express application and listen for incoming requests on th
// specified PORT. The connectDB() function is called to establish a connection to the MongoDB database
// using the mongoose.connect() method. The console.log() method is used to log a message to the console
// indicating that the server is running on the specified PORT.
