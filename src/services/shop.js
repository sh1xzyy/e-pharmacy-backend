import { ProductsCollection } from "../db/models/Products.js";
import { ShopCollection } from "../db/models/Shop.js";

export const createShop = async (req) => {
  const data = await ShopCollection.create(req.body);
  return data;
};

export const getShopInfo = async (req) => {
  const { shopId } = req.params;

  const data = await ShopCollection.findById(shopId);
  return data;
};

export const updateShop = async (req) => {
  const { shopId } = req.params;

  const updatedData = await ShopCollection.findByIdAndUpdate(shopId, req.body);
  return updatedData;
};

export const getProducts = async (req) => {
  const { shopId } = req.params;

  const data = await ProductsCollection.find({ shopId });
  return data;
};

export const addProduct = async (req) => {
  const { shopId } = req.params;

  const shop = await ShopCollection.findById(shopId);
  if (!shop) throw createHttpError(404, "Shop not found");

  const data = await ProductsCollection.create({
    ...req.body,
    photo: req.photo,
    shopId,
  });

  return data;
};

export const getProductById = async (req) => {
  const { shopId, productId } = req.params;

  const shop = await ShopCollection.findById(shopId);
  if (!shop) throw createHttpError(404, "Shop not found");

  const product = await ProductsCollection.findOne({
    _id: productId,
    shopId,
  });

  if (!product) throw createHttpError(404, "Product not found");

  return product;
};
