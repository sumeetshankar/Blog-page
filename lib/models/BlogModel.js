//This file defines the structure and rules for
// storing blog data in your MongoDB database using Mongoose.
// It creates a schema that specifies what fields each blog entry

import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title:{
        type:String,//string is used to store text about blog details 
        required:true //required:true means this field is mandatory so that any blog details is not left empty
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    authorImg:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now() // present date is set
    }
})

const BlogModel = mongoose.models.blog || mongoose.model('blog',Schema);

export default BlogModel;