const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, required: true },
    image: { type: String, required: true },
    images: { type: [[String]], required: true },
    colours: { type: [[String]]},
    sizes: { type: [String], required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    addedAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;