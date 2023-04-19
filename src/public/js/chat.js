const socket = io();

//para renderizar los mensajes
socket.on('totalMessages', data => {
    console.log(data)
    let messagesList = "";

    data.forEach((message) => {
        messagesList += `<p>${message.user_email}: ${message.user_message}</p>`;
    });
    document.getElementById("allMessages").innerHTML = messagesList;
})

//para enviar un nuevo mensaje
const formMessage = document.getElementById("formMessage");
formMessage.addEventListener("submit", (evt) => {
    evt.preventDefault()
    let user_email = document.getElementById('user').value;
    let user_message = document.getElementById('message').value;

    let newMessage = {
        user_email,
        user_message
    }
    socket.emit('newMessage', newMessage)
    formMessage.reset();
});





 
