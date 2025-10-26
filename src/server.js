import express from "express";
import cors from "cors";
import { getEnvVar } from "./utils/getEnvVar.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { authRouter } from "./routes/auth.js";
import cookieParser from "cookie-parser";
import { shopRouter } from "./routes/shop.js";
import { statisticsRouter } from "./routes/statistics.js";

export const setupServer = () => {
  const app = express();
  const apiRouter = express.Router();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  apiRouter.use("/user", authRouter);
  apiRouter.use("/shop", shopRouter);
  apiRouter.use("/statistics", statisticsRouter);
  app.use("/api", apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const SERVER_PORT = Number(getEnvVar("PORT"));

  app.listen(SERVER_PORT, () =>
    console.log(`Server is running on ${SERVER_PORT} port!`)
  );
};
