const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./src/config/db");
const productRoutes = require("./src/routes/product.routes");

const app = express();

/* DB */
connectDB();

/* MIDDLEWARE */
app.use(cors({
  origin: ["https://sssventures.in", "http://localhost:3000"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* STATIC */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ROUTES */
app.use("/api/products", productRoutes);

/* TEST */
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

/* START */
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
