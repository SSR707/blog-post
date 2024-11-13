import app from "./src/app.js";
import { connectMongodb } from "./src/database/index.js";
import { logger } from "./src/utils/index.js";

const startApp = async () => {
  try {
    connectMongodb();
    app.listen(3000, () => {
      logger.info(`Server started on port  ${3000}`);
    });
  } catch (err) {
    logger.err(err.message);
  }
};
startApp();