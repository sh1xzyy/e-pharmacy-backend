import { model, Schema } from "mongoose";

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
  },
  { versionKey: false, timestamps: true }
);

export const ShopCollection = model("shops", ShopSchema);
