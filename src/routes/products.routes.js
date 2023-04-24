import { Router } from "express";
import * as ProductController from "../controllers/products.controller.js";


const router = Router();

router.get("/", ProductController.getProducts);

router.post("/", ProductController.saveNewProduct);

export default router;
