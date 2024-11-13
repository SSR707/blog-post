import bcrypt, { hash } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "supperAdmin"],
      default: "user",
    },
    is_active: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(this.password, salt);
  this.password = hashPassword;
});

userSchema.method("compare", function (userPassword) {
  return bcrypt.compare(userPassword, this.password);
});

export const User = mongoose.model("user", userSchema);
