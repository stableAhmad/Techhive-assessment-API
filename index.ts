import express from "express";
import { listRouter } from "./routes/router";

import { Express, Request, Response } from "express";

const PORT = process.env.PORT || 7000;

const app: Express = express();

app.use(express.json());
app.use("/list", listRouter);

app.get("/", (req: Request, res: Response) => {
     res.send("List app API");
});

app.listen(PORT, () => {
     console.log(`List app is listening on ${PORT}`);
});
