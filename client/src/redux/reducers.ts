import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import notifyReducer from "./notify/notify.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  notify: notifyReducer,
});

export default rootReducer;