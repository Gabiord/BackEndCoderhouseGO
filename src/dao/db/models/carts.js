import mongoose from "mongoose";

const collectionName = "carts"

const cartsSchema = new mongoose.Schema({
    cart_idUsuario: { type: Number, required: true },
    cart_products: [{
        product_id: { type: Number, required: true },
        product_quantity: { type: Number, required: true }
    }]},
    { timestamps: true }
);

const cartsModel = mongoose.model(collectionName, cartsSchema);

export default cartsModel;


