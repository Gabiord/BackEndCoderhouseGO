import { Router } from "express";
import ProductManager from "../services/productManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (request, response) => {
  let limite = Number(request.query.limit);
  const totalProducts = await productManager.getProducts();

  if (limite > 0) {
      const productsLimit = totalProducts.slice(0, limite);
      let productsToRender = {
        limit: true,
        totalP: false,
        productsLimit
      }
      console.log(productsToRender)
      response.render('home',productsToRender);
  }
  else {
      let productsToRender = {
        limit: false,
        totalP: true,
        totalProducts
      }
      console.log(productsToRender)
      response.render('home',productsToRender);
      }
  }
);

router.get("/:pid", async (request, response) => {
  const param = Number(request.params.pid);
  const product = await productManager.getProductById(param);
  let productsToRender = {
    limit: false,
    totalProducts: false,
    product
  }

  response.render('home',productsToRender.product);
});

router.post("/", async (request, response) => {
  let newProduct = request.body;
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

router.put("/:pid", async (request, response) => {
  let id = Number(request.params.pid);
  let campoModificado = request.body;
  let { campo, modificacion } = campoModificado;

  await productManager.bajarProductos();
  const verifID = productManager.products.some((product) => product.ID === id);

  if (!verifID) {
    response.send({ status: "Reject", message: "El producto no existe :(" });
  } else {
    const pedido = await productManager.updateProduct(id, campo, modificacion);
    response.send(pedido);
  }
});

router.delete("/:pid", async (request, response) => {
  let id = Number(request.params.pid);
  let deletedProduct = await productManager.deleteProduct(id);
  response.send(deletedProduct);
});


export default router;
