import { model, Schema } from "mongoose";
import { emailRegex, nameRegex, phoneRegex } from "../../constants/index.js";

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegex,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      match: emailRegex,
      required: true,
    },
    phone: {
      type: String,
      match: phoneRegex,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    spent: {
      type: String,
      default: 0,
    },
    address: {
      type: String,
    },
    shop: { type: Schema.Types.ObjectId, ref: "shops" },
  },
  { versionKey: false, timestamps: true }
);

export const CustomerCollection = model("customers", CustomerSchema);
