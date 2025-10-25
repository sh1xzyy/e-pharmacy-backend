import { model, Schema } from "mongoose";

const SuppliersSchema = new Schema(
  {
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    suppliers: {
      type: String,
    },
    date: {
      type: String,
    },
    amount: {
      type: String,
    },
    status: {
      type: String,
      enum: "Active" | "Deactive",
    },
  },
  { versionKey: false }
);

export const SuppliersCollection = model("suppliers", SuppliersSchema);
