const express = require("express");
const cors = require("cors");
const path = require("path");
const compression = require("compression");
const productRoutes = require("./routes/product.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

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

/* ✅ STATIC UPLOADS — CORRECT */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "src/uploads"))
);


app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

module.exports = app;
