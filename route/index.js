import { Router } from "express";
import AuthRouter from "./auth/index.js";
import ProductRouter from "./product/index.js";

const MainRouter = Router();

MainRouter.use("/auth", AuthRouter);
MainRouter.use("/product", ProductRouter);

export default MainRouter;
