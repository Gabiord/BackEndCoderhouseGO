import { Router } from "express";
import * as CartsController from "../controllers/carts.controller.js"

const router = Router();

router.get("/:cid", CartsController.getCartById);

router.get("/", CartsController.saveNewCart);

//DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
router.delete("/:cid/products/:pid", CartsController.deleteProductofCart);

//PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
router.put("/:cid", CartsController.updateCart);

//PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put("/:cid/products/:pid", CartsController.addProductToCart);

//DELETE api/carts/:cid deberá eliminar todos los productos del carrito 
router.delete("/:cid", CartsController.deleteAllproductsofCart);


export default router;

