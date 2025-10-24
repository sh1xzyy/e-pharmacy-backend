import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  createShopController,
  getShopInfoController,
  updateShopController,
} from "../controllers/shop.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

export const shopRouter = Router();

shopRouter.post("/create", authenticate, ctrlWrapper(createShopController));
shopRouter.get("/:id", authenticate, ctrlWrapper(getShopInfoController));
shopRouter.put("/:id/update", authenticate, ctrlWrapper(updateShopController));
