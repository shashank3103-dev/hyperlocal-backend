import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.js";
import mainRoutes from "./routes/main.routes.js";

const app = express();
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.use("/api/v1", mainRoutes);


// 404
app.use((_req, res) =>
  res.status(404).json({ success: false, message: "Not Found" })
);
// errors
app.use(errorHandler);

export default app;
