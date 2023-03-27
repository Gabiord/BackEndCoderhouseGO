import Express from "express";
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import realTimeProductsRoutes from "./routes/realTimeProducts.routes.js"
import __dirname from "./utils.js";
import handlebars from 'express-handlebars';
import { Server, Socket } from "socket.io";

const app = Express();

//Configuracion Servidor
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
});

const socketServer = new Server(httpServer)
socketServer.on('connection', socket => {
  console.log("Nuevo cliente conectado");

  socket.on('newProduct', data => {
    console.log(data)
  })

  let array = []
  socket.on("deleteProductID", data => {
    console.log(data)
    array.push(data)
    socket.emit("msgprueba",array)
  });
})


//Configuracion Postman
app.use(Express.json());
app.use(Express.urlencoded({ extended:true }));

//configuracion de HBS
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views/');
app.set('view engine', 'handlebars');


//Configuracion para utilizar carpeta public
app.use(Express.static(__dirname+'/public'));

//Declaraciones Router
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/realTimeProducts", realTimeProductsRoutes);







