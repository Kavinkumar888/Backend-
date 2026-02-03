const Product = require("../models/product.model");

/* -------- GET PRODUCTS (FAST LIST) -------- */
/* -------- GET PRODUCTS (REAL PAGINATION) -------- */



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
      .hint({ createdAt: -1 })
      .lean();

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* -------- CREATE PRODUCT -------- */
exports.createProduct = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";
    const specs = JSON.parse(req.body.specifications || "{}");

    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      mainCategory: req.body.mainCategory,
      subCategory: req.body.subCategory,
      nestedCategory: req.body.nestedCategory,
      specifications: specs,
      image: imagePath,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* -------- UPDATE PRODUCT -------- */
exports.updateProduct = async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    const specs = JSON.parse(req.body.specifications || "{}");

    const updateData = {
      name: req.body.name,
      price: req.body.price,
      mainCategory: req.body.mainCategory,
      subCategory: req.body.subCategory,
      nestedCategory: req.body.nestedCategory,
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
    res.status(500).json({ error: err.message });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* -------- DELETE PRODUCT -------- */
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
