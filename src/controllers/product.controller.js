const Product = require("../models/Product");

/* GET ALL PRODUCTS */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products); // ⚠️ ARRAY ONLY
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* CREATE PRODUCT */
exports.createProduct = async (req, res) => {
  try {
    const specs = req.body.specifications
      ? JSON.parse(req.body.specifications)
      : {};

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      mainCategory: req.body.mainCategory,
      subCategory: req.body.subCategory,
      nestedCategory: req.body.nestedCategory,
      specifications: specs,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* UPDATE PRODUCT */
exports.updateProduct = async (req, res) => {
  try {
    const specs = req.body.specifications
      ? JSON.parse(req.body.specifications)
      : {};

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        specifications: specs,
        ...(req.file && { image: `/uploads/${req.file.filename}` }),
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* DELETE PRODUCT */
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
