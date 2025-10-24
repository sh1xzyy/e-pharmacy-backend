import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  addProductController,
  createShopController,
  deleteProductByIdController,
  getProductByIdController,
  getProductsController,
  getShopInfoController,
  updateProductByIdController,
  updateShopController,
} from "../controllers/shop.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { upload } from "../middlewares/upload.js";

export const shopRouter = Router();

shopRouter.post("/create", authenticate, ctrlWrapper(createShopController));
shopRouter.get("/:shopId", authenticate, ctrlWrapper(getShopInfoController));
shopRouter.put(
  "/:shopId/update",
  authenticate,
  ctrlWrapper(updateShopController)
);

shopRouter.get(
  "/:shopId/product",
  authenticate,
  ctrlWrapper(getProductsController)
);
shopRouter.post(
  "/:shopId/product/add",
  authenticate,
  upload.single("photo"),
  ctrlWrapper(addProductController)
);
shopRouter.get(
  "/:shopId/product/:productId",
  authenticate,
  ctrlWrapper(getProductByIdController)
);
shopRouter.put(
  "/:shopId/product/:productId/edit",
  authenticate,
  ctrlWrapper(updateProductByIdController)
);
shopRouter.delete(
  "/:shopId/product/:productId/delete",
  authenticate,
  ctrlWrapper(deleteProductByIdController)
);
