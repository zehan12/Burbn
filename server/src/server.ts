import app from "@app";
import { Server } from "http";

const PORT = 2000;

const server: Server = app.listen(PORT, (): void => {
  console.log(`⚡️[server]: is running fast as Bugatti on http://localhost:${PORT}`);
});
