import express from "express";
import { userRoute } from "../modules/User/user.route";
import { authRouter } from "../modules/Auth/auth.route";
import { postRouter } from "../modules/Posts/post.route";
import { categoryRouter } from "../modules/Category/category.route";
import { paymentRoute } from "../modules/Payment/payment.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/post",
    route: postRouter,
  },
  {
    path: "/category",
    route: categoryRouter,
  },
  {
    path: "/payment",
    route: paymentRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
