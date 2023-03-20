import  Express  from "express";
import productRoutes from "./src/routes/products.routes.js"

const app = Express();
const PORT = 8080;

app.use(Express.json()) 

app.listen(PORT, ()=>{
    console.log(`server run on port ${PORT}`)
})

app.use('/api/products', productRoutes)

