import { model } from "mongoose";
import userSchema from "./user/schema";

const User = model("user", userSchema);

export {
  User,
};
