import express from "express";
import cors from "cors";
import { getEnvVar } from "./utils/getEnvVar.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(notFoundHandler);
  app.use(errorHandler);

  const SERVER_PORT = Number(getEnvVar("PORT"));

  app.listen(SERVER_PORT, () =>
    console.log(`Server is running on ${SERVER_PORT} port!`)
  );
};
