import mongoose from "mongoose";

const collectionName = "carts";

const cartsSchema = new mongoose.Schema(
{
    cart_idUsuario: { type: String, required: true },
    cart_products: {
        type: [
            {
                products: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products",
                },
                quantity:{ type: Number, required: true }
            }
        ],
        default: []
    }
});

cartsSchema.pre('findOne', function(){
    this.populate("cart_products.products")
});

const cartsModel = mongoose.model(collectionName, cartsSchema);

export default cartsModel;
