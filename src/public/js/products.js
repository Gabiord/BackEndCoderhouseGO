
const botonesComprar = document.querySelectorAll("#btnComprar");

botonesComprar.forEach(btnComprar => {
    btnComprar.addEventListener("click", (evt)=>{
        const obj = { qty : 1 };
        fetch(`/api/carts/6448a0bceb2b17ca7a10adfb/products/${btnComprar.value}`,{
            method:'PUT',
            body: JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(result=>{
            if(result.status===200){
                console.log("bien")
                window.location.replace('/api/products');
            }
        })
    })    
});