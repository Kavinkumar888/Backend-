const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: Number,

    mainCategory: String,
    subCategory: String,
    nestedCategory: String,

    specifications: {
      composition: String,
      gsm: String,
      width: String,
      count: String,
      construction: String,
      weave: String,
      finish: String,
    },

    image: { type: String, default: "" },
  },
  { timestamps: true }
);

// 🔥 ADD THESE 2 LINES EXACTLY HERE
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ mainCategory: 1 });

module.exports = mongoose.model("Product", ProductSchema);
