import mongoose from "mongoose";
import { TErrorSource } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError) => {
  const errorSource: TErrorSource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 500;
  return {
    statusCode,
    message: "Invalid Id",
    errorSource,
  };
};
export default handleCastError;
