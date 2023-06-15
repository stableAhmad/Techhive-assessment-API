"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = require("./routes/router");
const PORT = process.env.PORT || 7000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/list", router_1.listRouter);
app.get("/", (req, res) => {
    res.send("List app API");
});
app.listen(PORT, () => {
    console.log(`List app is listening on ${PORT}`);
});
