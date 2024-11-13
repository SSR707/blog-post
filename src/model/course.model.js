import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Courses = mongoose.model("Courses", courseSchema);
