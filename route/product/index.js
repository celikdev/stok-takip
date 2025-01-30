import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateStock,
} from "../../controller/product/index.js";
import { checkToken } from "../../middleware/index.js";

const ProductRouter = Router();

ProductRouter.get("/", getProducts);
ProductRouter.post("/", createProduct);
ProductRouter.patch("/:id", checkToken, updateStock);
ProductRouter.delete("/:id", deleteProduct);

export default ProductRouter;
