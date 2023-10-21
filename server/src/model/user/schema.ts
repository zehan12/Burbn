import { Schema } from "mongoose";
const SchemaObjectId = Schema.Types.ObjectId;

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    role: { type: String, default: "user" },
    gender: { type: String, default: "male" },
    mobile: { type: String, default: "" },
    address: { type: String, default: "" },
    story: {
      type: String,
      default: "",
      maxlength: 200,
    },
    website: { type: String, default: "" },
    followers: [{ type: SchemaObjectId, ref: "user" }],
    following: [{ type: SchemaObjectId, ref: "user" }],
    saved: [{ type: SchemaObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

export default userSchema;