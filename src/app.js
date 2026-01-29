import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);

export default app;
