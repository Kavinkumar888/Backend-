import mongoose from "mongoose";

const specificationSchema = new mongoose.Schema({
  composition: String,
  gsm: String,
  width: String,
  count: String,
  construction: String,
  weave: String,
  finish: String,
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    mainCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    nestedCategory: String,
    specifications: specificationSchema,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
