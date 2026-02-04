const Product = require("../models/product.model");

/* ---------------- GET PRODUCTS ---------------- */
exports.getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 25;
    const lastCreatedAt = req.query.lastCreatedAt;

    let query = {};
    if (lastCreatedAt) {
      query.createdAt = { $lt: new Date(lastCreatedAt) };
    }

    const products = await Product.find(
      query,
      {
        name: 1,
        price: 1,
        image: 1,
        mainCategory: 1,
        subCategory: 1,
        nestedCategory: 1,
      }
    )
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.json(products);
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- CREATE PRODUCT ---------------- */
exports.createProduct = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    // ✅ SAFE JSON PARSE
    let specs = {};
    try {
      specs = req.body.specifications
        ? JSON.parse(req.body.specifications)
        : {};
    } catch {
      specs = {};
    }

    const product = await Product.create({
      name: req.body.name || "",
      price: Number(req.body.price) || 0, // ✅ important
      mainCategory: req.body.mainCategory || "",
      subCategory: req.body.subCategory || "",
      nestedCategory: req.body.nestedCategory || "",
      specifications: specs,
      image: imagePath,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- UPDATE PRODUCT ---------------- */
exports.updateProduct = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    // ✅ SAFE JSON PARSE
    let specs = {};
    try {
      specs = req.body.specifications
        ? JSON.parse(req.body.specifications)
        : {};
    } catch {
      specs = {};
    }

    const updateData = {
      name: req.body.name || "",
      price: Number(req.body.price) || 0, // ✅ important
      mainCategory: req.body.mainCategory || "",
      subCategory: req.body.subCategory || "",
      nestedCategory: req.body.nestedCategory || "",
      specifications: specs,
    };

    if (imagePath) updateData.image = imagePath;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- GET BY ID ---------------- */
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    res.json(product);
  } catch (err) {
    console.error("GET BY ID ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ---------------- DELETE ---------------- */
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
