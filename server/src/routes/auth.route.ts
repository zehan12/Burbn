import { signUp } from "controllers/auth.controller";
import express, { Router } from "express";
const authRouter: Router = express.Router();

authRouter.post("/register", signUp);

export default authRouter;