const socket = io();
socket.emit("message","Hola, me estoy comunicando desde websocket")

socket.on('evento para socket',data=>{
    console.log(data);
})