import { ShopCollection } from "../db/models/Shop.js";

export const createShop = async (req) => {
  await ShopCollection.create(req.body);
};

export const getShopInfo = async (req) => {
  const { id } = req.params;

  const data = await ShopCollection.findById(id);

  return data;
};

export const updateShop = async (req) => {
  const { id } = req.params;

  const updatedData = await ShopCollection.findByIdAndUpdate(id, req.body);

  return updatedData;
};
