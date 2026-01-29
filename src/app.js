import express from "express";
import cors from "cors";
import path from "path";
import productRoutes from "./routes/product.routes.js";

const app = express();

// ✅ CORS – correct & safe
app.use(
  cors({
    origin: [
      "https://sssventures.in",   // LIVE frontend
      "http://localhost:3000"    // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// body parser
app.use(express.json());

// static uploads
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// routes
app.use("/api/products", productRoutes);

export default app;
