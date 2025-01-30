import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/CatchAsync";
import { AnyZodObject } from "zod";

const validateRequest = (zodSchema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    await zodSchema.parseAsync({
      body: req.body,
    });
    next();
  });
};

export const validateRequestCookies = (schema: AnyZodObject) => {
  return catchAsync(async (req, res, next) => {
    const parsedCookies = await schema.parseAsync({
      cookies: req.cookies,
    });
    req.cookies = parsedCookies.cookies;
    next();
  });
};

export default validateRequest;
