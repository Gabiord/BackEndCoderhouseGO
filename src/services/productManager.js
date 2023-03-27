import fs from "fs";

class ProductManager {
  constructor() {
    (this.products = new Array()),
      (this.DirPath = "../files"),
      (this.FilePath = this.DirPath + "/products.json"),
      (this.fs = fs);
  }

  crearDir = async () => {
    await this.fs.promises.mkdir(this.DirPath, { recursive: true });
    if (!this.fs.existsSync(this.FilePath)) {
      await this.fs.promises.writeFile(this.FilePath, "[]");
    }
  };

  bajarProductos = async () => {
    let archivoString = await this.fs.promises.readFile(this.FilePath, "utf-8");
    this.products = JSON.parse(archivoString);
  };

  subirProductos = async (prop) => {
    let archivoString = JSON.stringify(prop);
    await this.fs.promises.writeFile(this.FilePath, archivoString);
  };

  addProduct = async (newProduct) => {
    try {
      await this.crearDir();
      await this.bajarProductos();
      let ID = Date.now();
      newProduct.ID = ID;
      newProduct.status = true;
      let confirm = this.products.some(
        (product) => product.code === newProduct.code
      );
      if (!confirm) {
        this.products.push(newProduct);
        let eliminandoNulls = this.products.filter((elem) => {
          return elem !== null;
        });
        await this.subirProductos(eliminandoNulls);
        return {
          status: "Success",
          message: "Producto agregado exitosamente",
          data: newProduct,
        };
      } else {
        return { status: "Reject", message: "Producto con codigo repetido" };
      }
    } catch (error) {
      console.error(`Error creando producto, detalle del error: ${error}`);
      throw Error(`Error creando producto, detalle del error: ${error}`);
    }
  };

  getProducts = async () => {
    try {
      if (fs.existsSync(this.FilePath)) {
        await this.bajarProductos();
        return(this.products);
      } else {
        return("No hay productos para mostrar");
      }
    } catch (error) {
      console.error(`Error cargando productos, detalle del error: ${error}`);
      throw Error(`Error cargando productos, detalle del error: ${error}`);
    }
  };

  getProductById = async (prop) => {
    try {
      await this.bajarProductos();
      let productId = this.products.find((product) => product.ID === prop);

      if (!productId) {
        return { status: "Reject", message: "No existe ese producto" };
      }
      return(productId);
      
    } catch (error) {
      console.error(`Error cargando productos, detalle del error: ${error}`);
      throw Error(`Error cargando productos, detalle del error: ${error}`);
    }
  };

  updateProduct = async (id, campo, modificacion) => {
    try {
      await this.bajarProductos();
      let index = this.products.findIndex((product) => product.ID === id);
      this.products[index][campo] = modificacion;
      await this.subirProductos(this.products);
      return {
        status: "Success",
        message: `Se ha editado el ${campo} del producto ${id}`,
      };
    } catch (error) {
      console.error(
        `Error al actualizar el producto, detalle del error: ${error}`
      );
      throw Error(
        `Error al actualizar el producto, detalle del error: ${error}`
      );
    }
  };

  deleteProduct = async (id) => {
    try {
      await this.bajarProductos();
      let confirm = this.products.some((product) => product.ID === id);

      console.log(confirm);

      if (confirm) {
        this.products = this.products.filter((producto) => producto.ID !== id);
        await this.subirProductos(this.products);
        return {
          status: "Success",
          message: "Producto eliminado exitosamente",
        };
      } else {
        return { status: "Reject", message: "El ID no existe :(" };
      }
    } catch (error) {
      console.error(
        `No se pudo eliminar el producto, detalle del error: ${error}`
      );
      throw Error(
        `No se pudo eliminar el producto, detalle del error: ${error}`
      );
    }
  };
}

export default ProductManager;
