import {model} from "mongoose";
import userSchema from "./user/schema";

export default {
  User: model("user", userSchema),
};