import mongoose from "mongoose";

const userSchema = new mongoose.Schema({}, {timestamps:true});
//createats and updateats fields will be automaticaly added into the document