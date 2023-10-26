import { login, logout, signUp } from "controllers/auth.controller";
import express, { Router } from "express";
const authRouter: Router = express.Router();

authRouter.post("/register", signUp);
authRouter.post("/login", login);
authRouter.delete("/logout", logout);
authRouter.get("/refresh-token", (req, res) => {
  console.log(req.cookies);
  res.end();
});

export default authRouter;
