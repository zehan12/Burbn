import express, { Express, Router } from "express";

const authRouter: Router = express.Router();

authRouter.post("/register", (req,res) => {
    res.send("hello")
});

export default authRouter;