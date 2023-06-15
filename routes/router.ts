import express from "express";

import { Router, Request, Response } from "express";
import {
     getLists,
     postList,
     deleteList,
     changeElementState,
     deleteElement,
     postElement,
} from "../models/List";

const listRouter: Router = express.Router();

listRouter.get("/get/:userId", async (req: Request, res: Response) => {
     const lists = await getLists(req.params.userId);
     return lists;
});

listRouter.post("/post", async (req: Request, res: Response) => {
     const result = await postList(req.body);
     res.send(result);
});

listRouter.post("/element/post", async (req: Request, res: Response) => {
     console.log(req.body);
     const result = await postElement(req.body);
     res.send(result);
});

listRouter.delete("/delete/:listId", (req: Request, res: Response) => {
     deleteList(req.params.listId);
     res.send("request received");
});

listRouter.delete("/element/delete/:elemId", (req: Request, res: Response) => {
     deleteElement(req.params.elemId);
     res.send("request received");
});

listRouter.put("/element/alterState/:elemId", (req: Request, res: Response) => {
     const result = changeElementState(req.params.elemId);
     res.send(result);
});
export { listRouter };
