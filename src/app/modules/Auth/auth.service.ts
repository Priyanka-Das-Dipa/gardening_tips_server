import status from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { createToken } from "../../utils/verifyJWT";
import { TLoginUser, TRegisterUser } from "./auth.interface";
import { User } from "../User/user.modal";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

const registerUserDb = async (payload: TRegisterUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  if (user) {
    throw new AppError(status.NOT_FOUND, "This user already exist");
  }

  const newUser = await User.create(payload);

  const tokenPayload = {
    _id: newUser?._id,
    name: newUser?.name,
    email: newUser?.email,
    phoneNumber: newUser?.phoneNumber,
    role: newUser?.role,
    verified: newUser?.verified,
  };
  const accessToken = createToken(
    tokenPayload,
    config.access_token_secret as string,
    config.jwt_access_expire as string
  );
  const refreshToken = createToken(
    tokenPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};
const loginToDb = async (payload: TLoginUser) => {
  // check if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(status.NOT_FOUND, "This user is not found!");
  }
  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(status.FORBIDDEN, "Password do not matched");

  const tokenPayload = {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    role: user?.role,
    verified: user?.verified,
  };
  const accessToken = createToken(
    tokenPayload,
    config.access_token_secret as string,
    config.jwt_refresh_expire_in as string
  );
  const refreshToken = createToken(
    tokenPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
};

const refreshTokenDb = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;
  const { email, iat } = decoded;
  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(status.NOT_FOUND, "This user is not found!");
  }
  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(status.UNAUTHORIZED, "You are not authorized !");
  }
  const tokenPayload = {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    role: user?.role,

    verified: user?.verified,
  };
  const accessToken = createToken(
    tokenPayload,
    config.access_token_secret as string,
    config.jwt_refresh_expire_in as string
  );
  return accessToken;
};
// update user
const updateUserDb = async (id: string, payload: TRegisterUser) => {
  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new AppError(status.NOT_FOUND, "User not found withh this is");
  }
  // check image new url added

  if (!payload.profilePhoto) {
    payload.profilePhoto = isUserExist?.profilePhoto;
  }
  const newUser = await User.findByIdAndUpdate(id, payload, {
    new: true,
    upsert: true,
  });
  return newUser;
};

// change password

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userData.email);

  if (!user) {
    throw new AppError(status.NOT_FOUND, "This user is not found!");
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(status.FORBIDDEN, "Password do not matched");

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_saltround)
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    }
  );

  return null;
};

export const authServices = {
  registerUserDb,
  loginToDb,
  refreshTokenDb,
  updateUserDb,
  changePassword,
};
