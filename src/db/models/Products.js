import { model, Schema } from "mongoose";

export const ProductsSchema = new Schema(
  {
    photo: {
      type: String,
    },
    name: {
      type: String,
    },
    suppliers: {
      type: String,
    },
    stock: {
      type: String,
    },
    price: {
      type: String,
    },
    category: {
      type: String,
      enum: ["Head", "Leg", "Medicine", "Hand", "Heart", "Dental Care"],
    },
    shopId: { type: Schema.Types.ObjectId, ref: "shops" },
  },
  { versionKey: false }
);

export const ProductsCollection = model("products", ProductsSchema);
