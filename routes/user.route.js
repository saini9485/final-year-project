const express = require("express");
const userRoute = express.Router();
const { getProducts, getSingleProduct } = require("../controllers/products");
const {
  getCart,
  addCart,
  updateCart,
  deleteCart,
  emptyCart,
} = require("../controllers/cart");
const {
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/address");
const { getOrders, addOrder } = require("../controllers/orders");
const { validator } = require("../middlewares/validator");

const routesToValidate = [
  "/cart",
  "/cart/add",
  "/cart/update/:cartId",
  "/cart/delete/:cartId",
  "/cart/emptycart",
  "/address",
  "/address/add",
  "/address/update/:addressId",
  "/address/delete/:addressId",
  "/orders",
  "/orders/add",
];

// Loop through the array of routes to validate and apply the middleware to each one
routesToValidate.forEach((route) => {
  userRoute.use(route, validator);
});

userRoute.get("/products", getProducts);

userRoute.get("/product/:productId", getSingleProduct);

userRoute.get("/cart", getCart);

userRoute.post("/cart/add", addCart);

userRoute.patch("/cart/update/:cartId", updateCart);

userRoute.delete("/cart/delete/:cartId", deleteCart);

userRoute.delete("/cart/emptycart", emptyCart);

userRoute.get("/address", getAddress);

userRoute.post("/address/add", addAddress);

userRoute.patch("/address/update/:addressId", updateAddress);

userRoute.delete("/address/delete/:addressId", deleteAddress);

userRoute.get("/orders", getOrders);

userRoute.post("/orders/add", addOrder);

module.exports = { userRoute };
