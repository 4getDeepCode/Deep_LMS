import cookieParser from "cookie-parser";
import express from "express";

import cors from "cors";
import morgan from "morgan";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  }),
);

app.use(morgan("dev"));
app.use(cookieParser());

app.get("/ping", (_req, res) => {
  res.send("Pong");
});

app.use("/api/v1/user", userRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "OOPS!!! 404 Page Not Found",
  });
});

app.use(errorMiddleware);

export default app;
