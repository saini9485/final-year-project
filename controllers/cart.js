const { CartModel } = require("../models/cart.model");

const getCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const cartProducts = await CartModel.find({ userId });
    return res.status(200).json(cartProducts);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

const addCart = async (req, res) => {
  try {
    const newCart = new CartModel(req.body);
    await newCart.save();
    return res.status(200).json(newCart);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

const updateCart = async (req, res) => {
  const { userId } = req.body;
  const { cartId } = req.params;

  try {
    const productExist = await CartModel.findById(cartId);
    if (productExist.userId === userId) {
      const cartProduct = await CartModel.findByIdAndUpdate(cartId, req.body, {
        new: true,
        strict: "throw",
      });
      return res.status(200).json(cartProduct);
    } else if (Object.keys(productExist).length > 0) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      return res.status(404).json({ message: "Product does not exists" });
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

const deleteCart = async (req, res) => {
  const { userId } = req.body;
  const { cartId } = req.params;

  try {
    const productExist = await CartModel.findById(cartId);
    if (productExist.userId === userId) {
      const cartProduct = await CartModel.findByIdAndDelete(cartId);
      return res.status(200).json(cartProduct);
    } else if (Object.keys(productExist).length > 0) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      return res.status(404).json({ message: "Product does not exists" });
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

const emptyCart = async (req, res) => {
  const { userId } = req.body;

  try {
    await CartModel.deleteMany({ userId });
    return res.status(200);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports = { getCart, addCart, updateCart, deleteCart, emptyCart };
