import monogoose from "mongoose";
const Schema = monogoose.Schema;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin",],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = monogoose.model("User", userSchema);

export default User;
