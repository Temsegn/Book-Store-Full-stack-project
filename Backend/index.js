import express from "express";
import config from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose.set("debug", true); // Log MongoDB operations

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.url} - Body:`,
    req.body
  );
  next();
});

app.use("/books", bookRoutes);

app.post("/test", (req, res) => {
  console.log("Test POST received:", req.body);
  res.status(200).json({ message: "POST successful", data: req.body });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Invalid JSON:", err.message);
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  next(err);
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const startServer = async () => {
  try {
    console.log("Connecting to MongoDB at:", config.db);
    await mongoose.connect(config.db, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
      maxPoolSize: 10,
      connectTimeoutMS: 30000,
    });
    console.log("Connected to MongoDB");

    const server = app.listen(config.port, "0.0.0.0", () => {
      console.log(`Server is running on port ${config.port}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${config.port} is already in use.`);
      } else {
        console.error("Server startup error:", error.message);
      }
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

startServer();
