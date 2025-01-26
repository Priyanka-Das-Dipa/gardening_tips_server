"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/User/user.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const post_route_1 = require("../modules/Posts/post.route");
const category_route_1 = require("../modules/Category/category.route");
const payment_route_1 = require("../modules/Payment/payment.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.userRoute,
    },
    {
        path: "/auth",
        route: auth_route_1.authRouter,
    },
    {
        path: "/post",
        route: post_route_1.postRouter,
    },
    {
        path: "/category",
        route: category_route_1.categoryRouter,
    },
    {
        path: "/payment",
        route: payment_route_1.paymentRoute,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
