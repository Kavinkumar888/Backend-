const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const controller = require("../controllers/product.controller");

// GET ALL PRODUCTS (light + pagination)
router.get("/", controller.getProducts);

// GET SINGLE PRODUCT (heavy)
router.get("/:id", controller.getProductById);

// CREATE PRODUCT
router.post("/", upload.single("image"), controller.createProduct);

// UPDATE PRODUCT
router.put("/:id", upload.single("image"), controller.updateProduct);

// DELETE PRODUCT
router.delete("/:id", controller.deleteProduct);

module.exports = router;
