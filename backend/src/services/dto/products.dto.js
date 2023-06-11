export default class productDTO {
    constructor(product){
        this.product_name= product.name;
        this.product_description = product.description;
        this.product_price = product.price;
        this.product_category = product.category;
        this.product_thumbnail= product.thumbnail;
        this.product_stock = product.stock;
        this.product_status = product.status;
    }
}
