import { Router } from "express";
import * as CartsController from "../controllers/carts.controller.js"

const router = Router();

router.get("/:cid", CartsController.getCartById);

router.post("/", CartsController.saveCart);

export default router;
