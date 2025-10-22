import { loginUser, refreshUser, registerUser } from "../services/auth.js";

export const registerController = async (req, res) => {
  await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully register user",
    data: req.body,
  });
};

export const loginController = async (req, res) => {
  const { accessToken, refreshToken } = await loginUser(req, res);

  res.status(201).json({
    status: 201,
    message: "Successfully login user",
    accessToken,
    refreshToken,
  });
};

export const refreshController = async (req, res) => {
  const { accessToken, refreshToken } = await refreshUser(req, res);

  res.status(200).json({
    status: 200,
    message: "Token refreshed successfully",
    accessToken,
    refreshToken,
  });
};
