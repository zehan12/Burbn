import app from "@app";
import { Server } from "http";
import { Bugatti } from "misc/emoji";

const PORT = 2000;

const server: Server = app.listen(PORT, (): void => {
  console.log(`${Bugatti}
  ⠀⚡️[server]: is running fast as Bugatti on http://localhost:${PORT}`);
});
