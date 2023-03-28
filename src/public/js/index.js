// Configuracion del socket del lado del cliente.
const socket = io();
socket.emit('msg', "Hola soy el cliente!!")

const formProduct = document.getElementById("formProduct");
formProduct.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    let category = document.getElementById('category').value;
    let thumbail = document.getElementById('thumbail').value;
    let code = document.getElementById('code').value;
    let stock = document.getElementById('stock').value;

    let newProduct = {
        title,
        description,
        price,
        category,
        thumbail,
        code,
        stock
    }
    socket.emit('newProduct', newProduct)
});

const formDeleteProduct = document.getElementById('formDeleteProduct')
formDeleteProduct.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    let ID = document.getElementById('id').value;
    socket.emit("deleteProductID", ID)
})









