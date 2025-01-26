/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSource } from "../interface/error";

const handleDuplicateError = (err: any) => {
  const errorSource: TErrorSource = [
    {
      path: "",
      message: ` ${err?.errmsg} is already exist`,
    },
  ];
  const statusCode = 500;
  return {
    statusCode,
    message: err?.message,
    errorSource,
  };
};
export default handleDuplicateError;
