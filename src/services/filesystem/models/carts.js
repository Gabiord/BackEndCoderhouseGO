export default class cartsModel {
    constructor(idUsuario){
        this.cart_idUsuario = idUsuario;
        this.cart_products = new Array();
        this._id = Math.floor(Math.random()* 100000);
    }
}
