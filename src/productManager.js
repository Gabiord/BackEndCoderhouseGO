import fs from "fs"

class ProductManager {

  constructor() {
    (this.products = new Array()),
      (this.DirPath = "src/files"),
      (this.FilePath = this.DirPath + "/products.json"),
      (this.fs = fs);
  }

  crearDir = async () => {
    await this.fs.promises.mkdir(this.DirPath, { recursive: true });
    if (!this.fs.existsSync(this.FilePath)) {
      await this.fs.promises.writeFile(this.FilePath, "[]");
    }
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
      if (typeof stock !== "undefined") {
        await this.crearDir();
        let archivoString = await this.fs.promises.readFile(
          this.FilePath,
          "utf-8"
        );
        this.products = JSON.parse(archivoString);
        let ID = Date.now();
        let confirm = this.products.some((product) => product.code === code);
        if (!confirm) {
          const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            ID,
          };

          this.products.push(newProduct);
          let eliminandoNulls = this.products.filter((elem) => {
            return elem !== null;
          });
          archivoString = JSON.stringify(eliminandoNulls);
          await this.fs.promises.writeFile(this.FilePath, archivoString);
          console.log("Producto agregado exitosamente");
        } else {
          console.error("El codigo esta repetido");
        }
      } else {
        console.error("Todos los campos son obligatorios");
      }
    } catch (error) {
      console.error(`Error creando producto, detalle del error: ${error}`);
      throw Error(`Error creando producto, detalle del error: ${error}`);
    }
  };

  getProducts = async () => {
    try {       
      if (fs.existsSync(this.FilePath)) {
        let archivoString = await this.fs.promises.readFile(
          this.FilePath,
          "utf-8"
        );
        this.products = JSON.parse(archivoString)
        return(this.products)
        
      } else {
        return(this.products);
      }
    } catch (error) {
      console.error(`Error cargando productos, detalle del error: ${error}`);
      throw Error(`Error cargando productos, detalle del error: ${error}`);
    }
  };

  getProductById = async (prop) => {
    try {
      let archivoString = await this.fs.promises.readFile(
        this.FilePath,
        "utf-8"
      );
      this.products = JSON.parse(archivoString);
      let productId = this.products.find((product) => product.ID === prop);

      if (productId) {
        console.log(productId);
      } else {
        console.error("no se encontro ese ID");
      }
    } catch (error) {
      console.error(`Error cargando productos, detalle del error: ${error}`);
      throw Error(`Error cargando productos, detalle del error: ${error}`);
    }
  };

  updateProduct = async (id, campo, modificacion) => {
    try {
      let archivoString = await this.fs.promises.readFile(
        this.FilePath,
        "utf-8"
      );
      this.products = JSON.parse(archivoString);
      let index = this.products.findIndex((product) => product.ID === id);
      this.products[index][campo] = modificacion;
      archivoString = JSON.stringify(this.products);
      await this.fs.promises.writeFile(this.FilePath, archivoString);
      console.log(`Se ha editado el ${campo} del producto ${id}`);
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
      let archivoString = await this.fs.promises.readFile(
        this.FilePath,
        "utf-8"
      );
      let archivoJson = JSON.parse(archivoString);
      let confirm = archivoJson.some((product) => product.ID === id);

      if (confirm) {
        this.products = archivoJson.filter((producto) => producto.ID !== id);
        archivoString = JSON.stringify(this.products);
        await this.fs.promises.writeFile(this.FilePath, archivoString);
        console.log("Producto eliminado exitosamente");
      } else {
        console.error("El ID no existe");
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