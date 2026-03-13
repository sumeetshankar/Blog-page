import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://sumeet:sumeetms123@cluster0.mix83oy.mongodb.net/blog-app');
    console.log("DB Connected");
}