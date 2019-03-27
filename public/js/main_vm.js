const socket  = io();

function logConnect({sID, message}) {
    debugger;
    console.log(sID, message);
}



socket.addEventListener('connect', logConnect);
socket.addEventListener('chat message', appendMessage);
socket.addEventListener('disconnect', appendMessage);

