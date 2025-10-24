import { model, Schema } from "mongoose";
import { ProductsSchema } from "./Products";

export const ShopSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    ownDeliverySystem: {
      type: Boolean,
      required: true,
    },
    products: [ProductsSchema],
  },
  { versionKey: false, timestamps: true }
);

export const ShopCollection = model("shops", ShopSchema);
