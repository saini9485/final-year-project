const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    title: { type: String, required: true },
    itemPrice: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    orderDate: { type: String, required: true },
    paidAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    items: { type: [itemSchema], required: true },
  },
  {
    versionKey: false,
  }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = { OrderModel };
