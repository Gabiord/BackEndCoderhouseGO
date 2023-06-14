import { Router } from "express";
import * as CartsController from "../controllers/carts.controller.js"

const router = Router();

router.post("/:cid/purchase", CartsController.finalizarCompra)


export default router;

