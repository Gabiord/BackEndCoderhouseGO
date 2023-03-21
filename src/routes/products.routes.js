import { Router } from "express";
import ProductManager from "../productManager.js"

const router = Router();
const Manager = new ProductManager();

router.get('/', async (request, response)=>{
    let limite = Number(request.query.limit);
    const totalProducts = await Manager.getProducts();
    if (limite > 0) {
      const productsLimit = totalProducts.slice(0, limite);
      response.send(productsLimit);
    } else {
      response.send(totalProducts);
    }
});

router.get('/:pid', async (request, response) => {
    const param = Number(request.params.pid);
    const product = await Manager.getProductById(param);
    response.send(product);
});

router.post('/', async(request, response)=>{

    let newProduct = request.body;
    let {title, description, price, category, thumbnail, code, stock} = newProduct;
    if (typeof (title && description && price && category && code && stock) !== "undefined"){
        const addProduct = await Manager.addProduct(newProduct)
        response.send(addProduct)
    }
    else{
        response.send("Todos los campos son obligatorios, a excepción de thumbnails");
    }
})

router.put('/:pid', async(request, response)=>{
    let id = Number(request.params.pid);
    let campoModificado = request.body;
    let {campo, modificacion}= campoModificado;
    const pedido = await Manager.updateProduct(id,campo,modificacion)
    response.send(pedido)
})

router.delete('/:pid', async(request,response)=>{
    let id = Number(request.params.pid);
    let deletedProduct = await Manager.deleteProduct(id)
    response.send(deletedProduct)
})

export default router;
