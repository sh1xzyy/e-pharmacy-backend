import { model, Schema } from "mongoose";
import {
  emailRegex,
  nameRegex,
  passwordRegex,
  phoneRegex,
} from "../../constants/constants.js";

const customerSchema = new Schema(
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
      match: passwordRegex,
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
  },
  { versionKey: false, timestamps: true }
);

export const CustomerCollection = model("customers", customerSchema);
