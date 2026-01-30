const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const controller = require("../controllers/product.controller");

// GET ALL PRODUCTS
router.get("/", controller.getProducts);

// CREATE PRODUCT
router.post("/", upload.single("image"), controller.createProduct);

// UPDATE PRODUCT
router.put("/:id", upload.single("image"), controller.updateProduct);

// DELETE PRODUCT
router.delete("/:id", controller.deleteProduct);

// 🔴 THIS LINE MUST BE LAST
module.exports = router;
