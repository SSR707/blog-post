import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    articalId: { type: mongoose.Schema.Types.ObjectId, ref: "Artical" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Courses" },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model("Comment", commentsSchema);
