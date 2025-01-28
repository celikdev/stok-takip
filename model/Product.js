import mongoose from "mongoose";

const stockTransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  serial: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  stockTransaction: {
    type: [stockTransactionSchema],
    default: [],
  },
});

export default mongoose.model("Product", productSchema);
