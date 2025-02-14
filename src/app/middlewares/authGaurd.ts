import status from "http-status";
import AppError from "../errors/AppError";
import { USER_ROLE } from "../modules/User/user.constant";
import catchAsync from "../utils/CatchAsync";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/verifyJWT";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/User/user.modal";

const authGaurd = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log(token);
    // check if the token is missing
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "Your are not authorized");
    }
    const bearer = token.split(" ");
    // console.log(bearer[1]);
    const decoded = verifyToken(
      bearer[1],
      config.access_token_secret as string
    ) as JwtPayload;

    const { role, email } = decoded;
    // check if the use is exist
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(
        status.UNAUTHORIZED,
        "Your are not eligible for this operation"
      );
    }

    // checking
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(status.UNAUTHORIZED, "Your are not authorized");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default authGaurd;
