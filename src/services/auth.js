import createHttpError from "http-errors";
import { CustomerCollection } from "../db/models/Customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getEnvVar } from "../utils/getEnvVar.js";

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await CustomerCollection.findOne({ email });

  if (user) throw createHttpError(409, "Email in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await CustomerCollection.create({
    ...payload,
    password: hashedPassword,
  });

  const { password: pass, ...userWithoutPass } = newUser.toObject();

  return { user: userWithoutPass };
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await CustomerCollection.findOne({ email });

  if (!user) throw createHttpError(401, "Email or password is invalid");

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare)
    throw createHttpError(401, "Email or password is invalid");

  const accessToken = jwt.sign(
    { userId: user._id },
    getEnvVar("ACCESS_TOKEN_SECRET"),
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    { userId: user._id },
    getEnvVar("REFRESH_TOKEN_SECRET"),
    {
      expiresIn: "7d",
    }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const { password: pass, ...userWithoutPass } = user.toObject();

  return { user: userWithoutPass, accessToken, refreshToken };
};

export const refreshUser = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw createHttpError(400, "No refresh token");
  }

  const decoded = jwt.verify(refreshToken, getEnvVar("REFRESH_TOKEN_SECRET"));

  if (!decoded) {
    throw createHttpError(401, "Invalid token or refresh token is expired");
  }

  const user = await CustomerCollection.findOne({ _id: decoded.userId });

  if (!user) throw createHttpError(401, "User not found");

  const newAccessToken = jwt.sign(
    { userId: user._id },
    getEnvVar("ACCESS_TOKEN_SECRET"),
    {
      expiresIn: "15m",
    }
  );

  const newRefreshToken = jwt.sign(
    { userId: user._id },
    getEnvVar("REFRESH_TOKEN_SECRET"),
    {
      expiresIn: "7d",
    }
  );

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const logoutUser = async (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
  });
};

export const userInfo = async (req) => {
  const user = await CustomerCollection.findById({ _id: req.user.id });

  const { password, ...dataWithoutPass } = user.toObject();
  return dataWithoutPass;
};
