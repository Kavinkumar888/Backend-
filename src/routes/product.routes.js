const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const controller = require("../controllers/product.controller");

router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);
router.post("/", upload.single("image"), controller.createProduct);
router.put("/:id", upload.single("image"), controller.updateProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
