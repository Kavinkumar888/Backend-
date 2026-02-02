const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const controller = require("../controllers/product.controller");

// LIST (light)
router.get("/", controller.getProducts);

// DETAIL (heavy)
router.get("/:id", controller.getProductById);

// CREATE
router.post("/", upload.single("image"), controller.createProduct);

// UPDATE
router.put("/:id", upload.single("image"), controller.updateProduct);

// DELETE
router.delete("/:id", controller.deleteProduct);

module.exports = router;
