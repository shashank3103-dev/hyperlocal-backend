import { config } from "./config/env";
import app from "./app.js";
import { prisma } from "./infra/prisma";
import { logger } from "./config/logger";

async function main() {
  await prisma.$connect();
  app.listen(config.port, () =>
    logger.info(`🚀 Server on http://localhost:${config.port}`)
  );
}
main().catch((e) => {
  logger.error(e);
  process.exit(1);
});
