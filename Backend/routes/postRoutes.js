import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import PostSchema from "../models/post.js";

dotenv.config();
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



//get all posts
router.get("/", async (req, res) => {
    try {
      let post = await PostSchema.find({});
      res.status(200).json({ data:post });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });

// route for post in db
router.post("/", async (req, res) => {
  try {
    const { image, prompt } = req.body;
    const imageUrl = await cloudinary.uploader.upload(image); //uploading images in cloudinary and geting the url
    let newPost = await PostSchema.create({
      prompt,
      image: imageUrl.url,
    });
    res.status(201).json({ Success: true });
  } catch (error) {
    res.status(500).json({ Success: false, message: error });
  }


});

export default router;
