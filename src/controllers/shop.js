import {
  addProduct,
  createShop,
  deleteProductById,
  getProductById,
  getProducts,
  getShopInfo,
  updateProductById,
  updateShop,
} from "../services/shop.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";

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

export const addProductController = async (req, res) => {
  let imageUrl = null;
  if (req.file) {
    imageUrl = await saveFileToCloudinary(req.file);
  }

  const data = await addProduct({
    ...req,
    photo: imageUrl,
  });

  res.status(201).json({
    status: 201,
    message: "Add product successfully",
    data,
  });
};

export const getProductByIdController = async (req, res) => {
  const data = await getProductById(req);

  res.status(200).json({
    status: 200,
    message: "Product retrieved successfully",
    data,
  });
};

export const updateProductByIdController = async (req, res) => {
  const data = await updateProductById(req);

  res.status(200).json({
    status: 200,
    message: "Product updated successfully",
    data,
  });
};

export const deleteProductByIdController = async (req, res) => {
  await deleteProductById(req);

  res.status(200).json({
    status: 200,
    message: "Product deleted successfully",
  });
};
