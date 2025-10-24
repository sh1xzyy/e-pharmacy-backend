import { TEMP_DIR } from "./constants/index.js";
import { initMongoConnection } from "./db/initMongoConnection.js";
import { setupServer } from "./server.js";
import { createDirIfNotExist } from "./utils/createDirIfNotExist.js";

(async function () {
  await initMongoConnection();
  setupServer();
  await createDirIfNotExist(TEMP_DIR);
})();
