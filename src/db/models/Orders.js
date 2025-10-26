import { model, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    photo: {
      type: String,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    products: {
      type: String,
    },
    price: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "Shipped",
        "Processing",
        "Completed",
        "Delivered",
        "Confirmed",
        "Pending",
      ],
    },
    owner: { type: Schema.Types.ObjectId, ref: "shops" },
  },
  { versionKey: false }
);

export const OrderCollection = model("orders", OrderSchema);
