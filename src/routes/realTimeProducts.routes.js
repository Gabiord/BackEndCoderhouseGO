import { request, Router } from "express";
import ProductManager from "../services/productManager.js";


const router = Router();
const productManager = new ProductManager();

router.get("/", async(request,respose)=>{
    const totalProducts = await productManager.getProducts();
    let productsToRender = {
        totalProducts
      }
    respose.render('realTimeProducts',productsToRender)
})


router.post("/", async (request, response) => {
  let newProduct = variable;
  let { title, description, price, category, thumbnail, code, stock } =
    newProduct;
  if (
    typeof (title && description && price && category && code && stock) !==
    "undefined"
  ) {
    const addProduct = await productManager.addProduct(newProduct);
    response.send(addProduct);
  } else {
    response.send({
      status: "Reject",
      message: "Todos los campos son obligatorios (Excepto thumbail)",
    });
  }
});

export default router;