// Configuracion del socket del lado del cliente.
const socket = io();

//para renderizar los productos
socket.on('totalProducts', data => {
    console.log(data)
    let productsList = "";

    data.forEach((product) => {
        productsList += `<ul>
                            <li>Titulo: ${product.title}</li>
                            <li>Descripcion: ${product.description}</li>
                            <li>Precio: ${product.price}</li>
                            <li>Categoria: ${product.category}</li>
                            <li>Codigo: ${product.code}</li>
                            <li>Stock: ${product.stock}</li>
                            <li>ID: ${product.ID}</li>
                            <li>Estatus: ${product.status}</li>
                        </ul>`;
    });
    document.getElementById("totalProducts").innerHTML = productsList;
})

//para cargar un nuevo producto
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
    formProduct.reset();
    
});

//Para eliminar un producto
const formDeleteProduct = document.getElementById('formDeleteProduct')
formDeleteProduct.addEventListener("submit", (evt)=> {
    evt.preventDefault();
    let ID = Number(document.getElementById('id').value);
    socket.emit("deleteProductID", ID);
    formDeleteProduct.reset();
})











