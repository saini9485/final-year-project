const ProductModel = require("../models/product.model.js");
const express = require("express");
const adminProductRouter = express.Router();
const auth=require("../middlewares/auth.middleware.js");



//get request
adminProductRouter.get("/products",auth, async (req, res) => {
  
  let page = req.query.page;
  let limit=page==0?0:10;
  let skip = (page - 1) * limit;
  
  try {
    let product = await ProductModel.find().skip(skip).limit(limit);
    let totalpages = await ProductModel.find()
    res.status(200).send({product,totalpages:totalpages.length});
  } catch (er) {
    res.status(400).send({ error: er.message });
  }
});




//post request from admin
adminProductRouter.post("/add",auth, async (req, res) => {
  let payload = req.body;
  try {
    let product = new ProductModel(payload);
    await product.save();
    res.status(200).send({ message: "product added" });
  } catch (er) {
    res.status(400).send({ error: er.message });
  }
});





//patch request
adminProductRouter.patch("/product/:id",auth, async (req, res) => {
  let payload = req.body;
  let id = req.params.id;
  try {
    await ProductModel.findByIdAndUpdate(id, payload);
    res.status(200).send({ message: "product updated" });
  } catch (er) {
    res.status(400).send({ error: er.message });
  }
});






//delete request
adminProductRouter.delete("/product/:id",auth, async (req, res) => {
  let id = req.params.id;
  try {
    await ProductModel.findByIdAndDelete(id);
    res.status(200).send({ message: "product deleted" });
  } catch (er) {
    res.status(400).send({ error: er.message });
  }
});

module.exports = adminProductRouter;
