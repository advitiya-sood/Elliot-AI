import mongoose from "mongoose";

const Post= new mongoose.Schema({
    prompt:{type:String, required:true},
    image:{type:String, required:true}
});

const PostSchema= mongoose.model("Post",Post)
export default PostSchema;

