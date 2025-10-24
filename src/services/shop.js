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

  const shop = await ShopCollection.findById(shopId).populate("productIds");
  if (!shop) throw createHttpError(404, "Shop not found");

  return shop.productIds;
};

export const addProduct = async (req) => {
  const { shopId } = req.params;

  const shop = await ShopCollection.findById(shopId);
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
  const { shopId, productId } = req.params;

  const shop = await ShopCollection.findById(shopId);
  if (!shop) throw createHttpError(404, "Shop not found");

  if (!shop.productIds.includes(productId)) {
    throw createHttpError(404, "Product not found in this shop");
  }

  const product = await ProductsCollection.findById(productId);
  return product;
};

export const updateProductById = async (req) => {
  const { shopId, productId } = req.params;

  const shop = await ShopCollection.findById(shopId);
  if (!shop) throw createHttpError(404, "Shop not found");

  if (!shop.productIds.includes(productId)) {
    throw createHttpError(404, "Product not found in this shop");
  }

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
