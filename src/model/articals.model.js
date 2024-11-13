import mongoose from "mongoose";

const articalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

export const Artical = mongoose.model("Artical", articalSchema);
