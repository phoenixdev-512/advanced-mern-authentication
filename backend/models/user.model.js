import mongoose from "mongoose";

//createats and updateats fields will be automaticaly added into the document
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    lastlogin:{
        type:Date,
        default: Date.now
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, {timestamps:true});

export const User=mongoose.model('User', userSchema);
// user.model.js defines the user schema and model using Mongoose. The user schema defines the structure of the user document, including the email, password, name, lastlogin, isVerified, resetPasswordToken, resetPasswordExpiresAt, verificationToken, and verificationTokenExpiresAt fields.
// The timestamps option is set to true, which means that Mongoose will automatically add createdAt and updatedAt
// fields to the document. The User model is created using the mongoose.model() method, which takes the name of the model ('User') and the user schema as arguments.
// The User model is then exported to be used in other parts of the application, such as the auth.controller.js file.
// The user model is used to interact with the MongoDB database and perform operations such as creating, updating, deleting, and querying user documents.
