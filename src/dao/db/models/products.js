 import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collectionName = "products";

const productsSchema = new mongoose.Schema({
    product_name:{
        type: String,
        require: [true, 'El nombre es requerido'],
        minlength: [3, 'El nombre es muy corto'],
        maxlength: [10, 'El nombre es muy largo']
    },
    product_description:{
        type: String,
        require: [true, 'La descripcion es requerida'],
    },
    product_price:{
        type: Number,
        require: [true, 'El precio es requerido']
    },
    prodduct_category:{
        type: String,
        require: [true, 'La categoria es requerida']
    },
    product_code:{
        type: String,
        unique: [true, 'El codigo debe ser unico'],
        require: [true, 'El codigo es requerido']
    },
    product_thumbnail:{
        type: String,
        require: [true, 'La imagen es requerida']
    },
    product_stock:{
        type: Number,
        require: [true, 'El stock es requerido']
    },
    product_status:{
        type: Boolean,
        require: [true, 'El estado es requerido']
    }
})

productsSchema.plugin(mongoosePaginate);
const productsModel = mongoose.model(collectionName, productsSchema)
export default productsModel;

