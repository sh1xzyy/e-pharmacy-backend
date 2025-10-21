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

  return newUser;
};

export const loginUser = async (payload) => {
  const { email, password, id } = payload;
  const user = await CustomerCollection.findOne({ email });

  if (!user) throw createHttpError(401, "Email or password is invalid");

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare)
    throw createHttpError(401, "Email or password is invalid");

  const accessToken = jwt.sign(
    { userId: id },
    getEnvVar("ACCESS_TOKEN_SECRET"),
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    { userId: id },
    getEnvVar("REFRESH_TOKEN_SECRET"),
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};
