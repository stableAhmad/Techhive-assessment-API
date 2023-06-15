"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRouter = void 0;
const express_1 = __importDefault(require("express"));
const List_1 = require("../models/List");
const listRouter = express_1.default.Router();
exports.listRouter = listRouter;
listRouter.get("/get/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lists = yield (0, List_1.getLists)(req.params.userId);
    res.send(lists);
}));
listRouter.post("/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, List_1.postList)(req.body);
    res.send(result);
}));
listRouter.post("/element/post", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const result = yield (0, List_1.postElement)(req.body);
    res.send(result);
}));
listRouter.delete("/delete/:listId", (req, res) => {
    (0, List_1.deleteList)(req.params.listId);
    res.send("request received");
});
listRouter.delete("/element/delete/:elemId", (req, res) => {
    (0, List_1.deleteElement)(req.params.elemId);
    res.send("request received");
});
listRouter.put("/element/alterState/:elemId", (req, res) => {
    const result = (0, List_1.changeElementState)(req.params.elemId);
    res.send(result);
});
