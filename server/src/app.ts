import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (_: Request, res: Response) => {
  res.send("Hello from backend");
});

export default app;
