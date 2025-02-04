import { Router } from "express";

import {
  check,
  deleteUser,
  login,
  register,
} from "../../controller/auth/index.js";

const AuthRouter = Router();

AuthRouter.post("/login", login);
AuthRouter.post("/register", register);
AuthRouter.get("/check", check);
AuthRouter.delete("/:id", deleteUser);

export default AuthRouter;
