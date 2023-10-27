import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "routes";

const app: Express = express();

// Set Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());

// all routes are added
app.use("/api",router);

app.get("/", (_: Request, res: Response) => {
  res.send("Hello from backend");
});

export default app;
