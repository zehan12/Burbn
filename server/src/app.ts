import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get("/", (_: Request, res: Response) => {
  res.send("Hello from backend");
});

export default app;
