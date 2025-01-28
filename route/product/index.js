import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateStock,
} from "../../controller/product/index.js";
import { checkToken } from "../../middleware/index.js";

const ProductRouter = Router();

ProductRouter.get("/", getProducts);
ProductRouter.post("/", createProduct);
ProductRouter.patch("/:id", checkToken, updateStock);

export default ProductRouter;
