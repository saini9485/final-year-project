const ProductModel = require("../models/product.model");

const getProducts = async (req, res) => {
  const { q, _page, _limit, _sort, _order, category } = req.query;

  const filters = {};

  if (q)
    filters.$or = [
      { title: new RegExp(q, "i") },
      { category: new RegExp(q, "i") },
      { description: new RegExp(q, "i") },
    ];

  if (category) {
    filters.category = { $in: category };
  }

  Object.keys(req.query).forEach((key) => {
    const value = parseInt(req.query[key]);
    const [field, operator] = key.split("_");

    if (operator === "lte") {
      filters[field] = filters[field] || {};
      filters[field]["$lte"] = value;
    } else if (operator === "gte") {
      filters[field] = filters[field] || {};
      filters[field]["$gte"] = value;
    }
  });

  const sort = {};

  if (_sort) {
    if (_order === "asc") {
      sort[_sort] = 1;
    } else if (_order === "desc") {
      sort[_sort] = -1;
    } else {
      sort[_sort] = 1;
    }
  }

  const limit = Number(_limit) || 10;
  const page = Number(_page) || 1;
  const skip = (page - 1) * limit;

  try {
    if (_page && _sort) {
      const products = await ProductModel.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit);
      return res.status(200).json(products);
    } else if (_page) {
      const products = await ProductModel.find(filters).skip(skip).limit(limit);
      return res.status(200).json(products);
    } else if (_sort) {
      const products = await ProductModel.find(filters).sort(sort);
      return res.status(200).json(products);
    } else {
      const products = await ProductModel.find(filters);
      return res.status(200).json(products);
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getSingleProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await ProductModel.findById(productId);
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = { getProducts, getSingleProduct };
