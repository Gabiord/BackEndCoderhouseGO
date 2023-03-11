import Express from "express";
import ProductManager from "./productManager.js";

const app = Express();
const PORT = 8080;
const Manager = new ProductManager();

app.listen(PORT, () => {
  console.log(`escuchando por el puesto ${PORT}`);
});

app.use(Express.urlencoded({ extended: true }));

app.get("/products", async (request, response) => {
  let limite = Number(request.query.limit);
  const totalProducts = await Manager.getProducts();

  if (limite > 0) {
    const productsWhitLimit = totalProducts.slice(0, limite);
    response.send(productsWhitLimit);
  } else {
    response.send(totalProducts);
  }
});

app.get("/products/:pid", async (request, response) => {
  const totalProducts = await Manager.getProducts();
  const param = Number(request.params.pid);
  const product = totalProducts.find((product) => product.ID === param);
  if (product) {
    response.send(product);
  } else {
    response.send("el producto no existe :(");
  }
});
