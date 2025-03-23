import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...")
        console.log("mongo_uri: ", process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error Connection to MongoDB: ", error.message)
        process.exit(1) // 1 means exit with failure || 0 means success
    }
}
export default connectDB;
// connectDB.js defines the connectDB function, which is responsible for establishing a connection to the MongoDB database using Mongoose. The function uses the mongoose.connect() method to connect to the MongoDB database using the MONGO_URI environment variable.
// The function logs the connection status to the console, including the MongoDB connection host, and catches any errors that occur during the connection process. If an error occurs, the function logs the error message to the console and exits the Node.js process with a failure status code (1).
// The connectDB function is exported to be used in other parts of the application, such as the server.js file, to establish a connection to the MongoDB database when the application starts.
