import express from "express";
import cors from "cors";
import path from "path";
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    const allowed = [
      "https://sssventures.in",
      "https://www.sssventures.in",
      "http://localhost:3000",
    ];

    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  },
  credentials: true,
}));

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
