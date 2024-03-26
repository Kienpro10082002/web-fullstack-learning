import mongoose from "mongoose";
import Collections from "../database/collection.js";

const postSchema = new mongoose.Schema({
    authorId: String,
    content: String
});

const PostModel = mongoose.model(Collections.POSTS, postSchema);
export default PostModel;