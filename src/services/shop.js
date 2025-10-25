import createHttpError from "http-errors";
import { CustomerCollection } from "../db/models/Customer.js";
import { ProductsCollection } from "../db/models/Products.js";
import { ShopCollection } from "../db/models/Shop.js";

export const createShop = async (req) => {
  const userId = req.user.id;

  const existingShop = await ShopCollection.findOne({ owner: userId });
  if (existingShop) throw createHttpError(404, "User already has a shop");

  const shop = await ShopCollection.create({ ...req.body, owner: userId });

  await CustomerCollection.findByIdAndUpdate(userId, { shop: shop._id });
  return shop;
};

export const getShopInfo = async (req) => {
  const userId = req.user.id;
  const { shopId } = req.params;

  const shop = await ShopCollection.findOne({
    _id: shopId,
    owner: userId,
  });
  if (!shop) throw createHttpError(404, "Shop not found");

  return shop;
};

export const updateShop = async (req) => {
  const userId = req.user.id;
  const { shopId } = req.params;

  const existingShop = await ShopCollection.findOne({
    _id: shopId,
    owner: userId,
  });
  if (!existingShop) throw createHttpError(404, "Shop not found");

  const updatedShop = await ShopCollection.findByIdAndUpdate(shopId, req.body, {
    new: true,
  });
  return updatedShop;
};

export const getProducts = async (req) => {
  const userId = req.user.id;
  const { shopId } = req.params;

  const shop = await ShopCollection.findOne({
    _id: shopId,
    owner: userId,
  }).populate("productIds");
  if (!shop) throw createHttpError(404, "Shop not found");

  return shop.productIds;
};

export const addProduct = async (req) => {
  const userId = req.user.id;
  const { shopId } = req.params;

  const shop = await ShopCollection.findOne({
    _id: shopId,
    owner: userId,
  });
  if (!shop) throw createHttpError(404, "Shop not found");

  const product = await ProductsCollection.create({
    ...req.body,
    photo: req.photo,
    shopId,
  });

  shop.productIds.push(product._id);
  await shop.save();

  return product;
};

export const getProductById = async (req) => {
  const userId = req.user.id;
  const { shopId, productId } = req.params;

  const shop = await ShopCollection.findById({
    _id: shopId,
    owner: userId,
  });
  if (!shop) throw createHttpError(404, "Shop not found");

  const product = await ProductsCollection.findById(productId);
  return product;
};

export const updateProductById = async (req) => {
  const userId = req.user.id;
  const { shopId, productId } = req.params;

  const shop = await ShopCollection.findById({
    _id: shopId,
    owner: userId,
  });
  if (!shop) throw createHttpError(404, "Shop not found");

  const updatedProduct = await ProductsCollection.findByIdAndUpdate(
    productId,
    req.body,
    { new: true }
  );

  return updatedProduct;
};

export const deleteProductById = async (req) => {
  const { shopId, productId } = req.params;

  const shop = await ShopCollection.findById(shopId);
  if (!shop) throw createHttpError(404, "Shop not found");

  if (!shop.productIds.includes(productId)) {
    throw createHttpError(404, "Product not found in this shop");
  }

  shop.productIds = shop.productIds.filter((id) => id.toString() !== productId);
  await shop.save();

  await ProductsCollection.findByIdAndDelete(productId);
};
