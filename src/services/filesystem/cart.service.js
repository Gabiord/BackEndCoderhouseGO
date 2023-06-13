import fs from "fs";
import cartsModel from "./models/carts.js";

class cartService {   
  constructor() {
      (this.carts = new Array()),
      (this.DirPath = "../files"),
      (this.FilePath = this.DirPath + "/cart.json"),
      (this.fs = fs);
  }

  crearDir = async () => {
    await this.fs.promises.mkdir(this.DirPath, { recursive: true });
    if (!this.fs.existsSync(this.FilePath)) {
      await this.fs.promises.writeFile(this.FilePath, "[]");
    }
  };

  bajarCarts = async () => {
    let archivoString = await this.fs.promises.readFile(this.FilePath, "utf-8");
    this.carts = JSON.parse(archivoString);
  };

  subirCarts = async (prop) => {
    let archivoString = JSON.stringify(prop);
    await this.fs.promises.writeFile(this.FilePath, archivoString);
  };

  createNewCart = async (prop) => {
    try {
      await this.crearDir();
      await this.bajarCarts();

      let newCart = new cartsModel(prop);
     
      this.carts.push(newCart);
      this.subirCarts(this.carts);
      return {
        status: "Success",
        message: "Carrito creado exitosamente",
        data: newCart,
      };
    } catch (error) {
      console.error(`Error creando Carrito, detalle del error: ${error}`);
      throw Error(`Error creando Carrito, detalle del error: ${error}`);
    }
  };

  getCartById = async (prop) => {
    try {
      await this.bajarCarts();
      let cartId = this.carts.find((cart) => cart.ID === prop);

      if (!cartId) {
        return { status: "Reject", message: "No existe ese carrito" };
      }

      return { status: "Success", payload: cartId };
    } catch (error) {
      console.error(`Error cargando carrito, detalle del error: ${error}`);
      throw Error(`Error cargando carrito, detalle del error: ${error}`);
    }
  };

  addProductToCart = async (cid, pid) => {
    try {
      await this.bajarCarts();
      let indexCart = this.carts.findIndex((cart) => cart.ID === cid);
      let cart = this.carts[indexCart].products;

      let indexProduct = cart.findIndex((producto) => producto.product === pid);
      if (indexProduct < 0) {
        let newProduct = { product: pid, quantity: 1 };
        cart.push(newProduct);
        this.carts[indexCart].products = cart;
        await this.subirCarts(this.carts);
        return {
          status: "Success",
          message: `se agrego el item del producto ${pid} al carrito ID:${cid}`,
        };
      } else {
        this.carts[indexCart].products[indexProduct].quantity += 1;
        await this.subirCarts(this.carts);
        return {
          status: "Success",
          message: `se sumo un item del producto ${pid} al carrito ID:${cid}`,
        };
      }
    } catch (error) {
      console.error(
        `Error cargando producto al carrito, detalle del error: ${error}`
      );
      throw Error(
        `Error cargando producto al carrito, detalle del error: ${error}`
      );
    }
  };
}

export default cartManager;
