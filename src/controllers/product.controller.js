import Product from "../models/Product.js";

/* GET PRODUCTS */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* CREATE PRODUCT – FORM DATA SUPPORT */
export const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: Number(req.body.price || 0),
      mainCategory: req.body.mainCategory,
      subCategory: req.body.subCategory,
      nestedCategory: req.body.nestedCategory,

      specifications: {
        composition: req.body.composition,
        gsm: req.body.gsm,
        width: req.body.width,
        count: req.body.count,
        construction: req.body.construction,
        weave: req.body.weave,
        finish: req.body.finish,
      },

      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE PRODUCT */
export const updateProduct = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: Number(req.body.price || 0),
      mainCategory: req.body.mainCategory,
      subCategory: req.body.subCategory,
      nestedCategory: req.body.nestedCategory,
      specifications: {
        composition: req.body.composition,
        gsm: req.body.gsm,
        width: req.body.width,
        count: req.body.count,
        construction: req.body.construction,
        weave: req.body.weave,
        finish: req.body.finish,
      },
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE PRODUCT */
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
