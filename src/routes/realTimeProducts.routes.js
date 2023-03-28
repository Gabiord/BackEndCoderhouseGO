import { Router } from "express";
import ProductManager from "../services/productManager.js";

const productManager = new ProductManager();
const router = Router();

router.get("/", async(request,respose)=>{
    const totalProducts = await productManager.getProducts();
    let productsToRender = {
        totalProducts
      }
    respose.render('realTimeProducts',productsToRender)
})

export default router;