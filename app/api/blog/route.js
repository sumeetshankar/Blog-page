import { ConnectDB } from "@/lib/config/db"
// Imports the function to connect to your database.

import BlogModel from "@/lib/models/BlogModel";
// Imports the Mongoose model for your blog data.

const { NextResponse } = require("next/server")
// Imports Next.js's response helper for API routes.

import { writeFile } from 'fs/promises'
// Imports the promise-based file writing function from Node.js.

const fs = require('fs')
// Imports the standard Node.js file system module.

const LoadDB = async () => {
  await ConnectDB();
}
// Defines an async function to connect to the database.

LoadDB();
// Immediately calls the function to connect to the database.

// API Endpoint to get all blogs
export async function GET(request) {
// Defines the GET handler for this API route.

  const blogId = request.nextUrl.searchParams.get("id"); //THIS LINE TAKES THE READ MORE BLOG PAGE ADDRESS 
  // Gets the 'id' query parameter from the request URL.

  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    // If an ID is provided, fetches the blog with that ID.  // SPECIFIC SINGLE BLOG PAGE
    return NextResponse.json(blog);
    // Returns the blog as a JSON response.
  }
  else {
    const blogs = await BlogModel.find({});     // ALL BLOG ID 
    // If no ID is provided, fetches all blogs.
    return NextResponse.json({ blogs })
    // Returns all blogs as a JSON response.
  }
}

// API Endpoint For Uploading Blogs
export async function POST(request) {
// Defines the POST handler for this API route.

  const formData = await request.formData();
  // Gets the form data from the request.

  const timestamp = Date.now();
  // Generates a timestamp for unique file naming.

  const image = formData.get('image');
  // Gets the uploaded image file from the form data.

  const imageByteData = await image.arrayBuffer();
  // Converts the image to an array buffer.

  const buffer = Buffer.from(imageByteData);
  // Converts the array buffer to a Node.js buffer.

  const path = `./public/${timestamp}_${image.name}`;
  // Creates a file path for saving the image.

  await writeFile(path, buffer);
  // Saves the image file to disk.

  const imgUrl = `/${timestamp}_${image.name}`;
  // Creates a URL for the saved image.

  const blogData = {
    title: `${formData.get('title')}`,
    description: `${formData.get('description')}`,
    category: `${formData.get('category')}`,
    author: `${formData.get('author')}`,
    image: `${imgUrl}`,
    authorImg: `${formData.get('authorImg')}`
  }
  // Builds a blog data object from the form fields.

  await BlogModel.create(blogData);
  // Saves the new blog entry to the database.

  console.log("Blog Saved");
  // Logs a message to the console.

  return NextResponse.json({ success: true, msg: "Blog Added" })
  // Returns a success message as a JSON response.
}

// Creating API Endpoint to delete Blog
export async function DELETE(request) {      // DELETE REQUEST FOR BLOG LIST
// Defines the DELETE handler for this API route.

  const id = await request.nextUrl.searchParams.get('id');
  // Gets the 'id' query parameter from the request URL.

  const blog = await BlogModel.findById(id);
  // Finds the blog entry by ID.

  fs.unlink(`./public${blog.image}`, () => { });
  // Deletes the associated image file from disk.

  await BlogModel.findByIdAndDelete(id);
  // Deletes the blog entry from the database.

  return NextResponse.json({ msg: "Blog Deleted" });
  // Returns a success message as a JSON response.
}