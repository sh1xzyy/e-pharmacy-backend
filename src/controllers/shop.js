import { createShop, getShopInfo, updateShop } from "../services/shop.js";

export const createShopController = async (req, res) => {
  await createShop(req);

  res.status(201).json({
    status: 201,
    message: "Shop created successfully",
  });
};

export const getShopInfoController = async (req, res) => {
  const data = await getShopInfo(req);

  res.status(200).json({
    status: 200,
    message: "Shop info retrieved successfully",
    data,
  });
};

export const updateShopController = async (req, res) => {
  const data = await updateShop(req);

  res.status(200).json({
    status: 200,
    message: "Shop updated successfully",
  });
};
