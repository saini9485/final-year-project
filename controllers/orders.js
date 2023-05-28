const { OrderModel } = require("../models/order.model");

const getOrders = async (req, res) => {
  const { userId } = req.body;

  try {
    const userOrders = await OrderModel.find({ userId });
    return res.status(200).json(userOrders);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

const addOrder = async (req, res) => {
  try {
    const newOrder = new OrderModel(req.body);
    await newOrder.save();
    return res.status(200).json(newOrder);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports = { getOrders, addOrder };
