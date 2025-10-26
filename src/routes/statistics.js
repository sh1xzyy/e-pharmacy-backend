import { Router } from "express";
import {
  getGoodStatisticsByIdController,
  getStatisticsController,
} from "../controllers/statistics.js";
import { authenticate } from "../middlewares/authenticate.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

export const statisticsRouter = Router();

statisticsRouter.get("/", authenticate, ctrlWrapper(getStatisticsController));
statisticsRouter.get(
  "/:clientId/goods",
  authenticate,
  ctrlWrapper(getGoodStatisticsByIdController)
);
