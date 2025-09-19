import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String, // ✅ Free text for the post body
      required: false,
    },

    postType: {
      type: String,
      enum: ["BUSINESS_UPDATE", "ACHIEVEMENT", "JOB_POSTING", "GENERAL"],
      default: "GENERAL",
    },

    images: [{ type: String }],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    shares: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
