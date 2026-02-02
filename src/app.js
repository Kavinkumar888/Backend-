import express from "express";
import cors from "cors";
import path from "path";
import compression from "compression";
import { fileURLToPath } from "url";
import productRoutes from "./routes/product.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* 🔥 VERY IMPORTANT — BODY PARSER FIRST */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 🔥 GZIP COMPRESSION (huge speed) */
app.use(compression());

/* CORS */
app.use(
  cors({
    origin: [
      "https://sssventures.in",
      "https://www.sssventures.in",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

/* STATIC UPLOADS */
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* ROUTES */
app.use("/api/products", productRoutes);

/* TEST */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

export default app;
