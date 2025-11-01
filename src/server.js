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
  const FRONTEND_URL = getEnvVar("FRONTEND_URL");

  app.use(
    cors({
      origin: ['http://localhost:3000', FRONTEND_URL],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/user", authRouter);
  app.use("/api/shop", shopRouter);
  app.use("/api/statistics", statisticsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const SERVER_PORT = Number(getEnvVar("PORT"));

  app.listen(SERVER_PORT, () =>
    console.log(`Server is running on ${SERVER_PORT} port!`)
  );
};
