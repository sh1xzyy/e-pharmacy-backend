import {
  createShop,
  getProducts,
  getShopInfo,
  updateShop,
} from "../services/shop.js";

export const createShopController = async (req, res) => {
  const data = await createShop(req);

  res.status(201).json({
    status: 201,
    message: "Shop created successfully",
    data,
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

export const getProductsController = async (req, res) => {
  const data = await getProducts(req);

  res.status(200).json({
    status: 200,
    message: "Get products successfully",
    data,
  });
};
