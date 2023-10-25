import app from "@app";
import { Server } from "http";
import connectDB from "config/db";

const PORT =  4000;

connectDB();

const server: Server = app.listen(PORT, (): void => {
  console.log(`⚡️[server]: is running fast as Bugatti on http://localhost:${PORT}`);
});
