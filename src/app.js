import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/product.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* CORS */
app.use(
  cors({
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
  })
);

/* STATIC UPLOADS */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

/* ROUTES FIRST (multer must read body first) */
app.use("/api/products", productRoutes);

/* JSON PARSER AFTER ROUTES */
app.use(express.json());

/* TEST */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

export default app;
