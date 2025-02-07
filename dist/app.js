"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./app/router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://garderning-website-client.vercel.app",
    ],
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api", router_1.default);
app.get("/", (req, res) => {
    res.status(200).json("Welcome to the Gardening Website server side!!");
});
exports.default = app;
