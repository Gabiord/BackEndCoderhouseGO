import Express from "express";
import productRoutes from "./src/routes/products.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";

const app = Express();
const PORT = 8080;

app.use(Express.json());

app.listen(PORT, () => {
  console.log(`server run on port ${PORT}`);
});

app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
