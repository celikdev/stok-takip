import Product from "../../model/Product.js";
import User from "../../model/User.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userID } = req.user;
    const { amount } = req.body;
    const product = await Product.findById(id);

    if (product.stock < 0) {
      // throw new Error("Stock cannot be negative");
      res.status(400).json({ error: "Stock cannot be negative" });
    }
    if (userID) {
      const user = await User.findById(userID);
      product.stock += amount;
      product.stockTransaction.push({
        type: amount > 0 ? "IN" : "OUT",
        username: user.username,
        quantity: amount,
      });
      product.stockTransaction.sort((a, b) => b.createdAt - a.createdAt);
      await product.save();
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
