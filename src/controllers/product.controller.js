const Product = require("../models/product.model");

/* ---------------- GET ALL PRODUCTS ---------------- */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- CREATE PRODUCT ---------------- */
exports.createProduct = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      mainCategory: req.body.mainCategory,
      subCategory: req.body.subCategory,
      nestedCategory: req.body.nestedCategory,

      // 🔥 VERY IMPORTANT FIX
      specifications: JSON.parse(req.body.specifications || "{}"),

      image: imagePath,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- UPDATE PRODUCT ---------------- */
exports.updateProduct = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const updateData = {
      name: req.body.name,
      price: req.body.price,
      mainCategory: req.body.mainCategory,
      subCategory: req.body.subCategory,
      nestedCategory: req.body.nestedCategory,

      // 🔥 VERY IMPORTANT FIX
      specifications: JSON.parse(req.body.specifications || "{}"),
    };

    if (imagePath) {
      updateData.image = imagePath;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- DELETE PRODUCT ---------------- */
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
