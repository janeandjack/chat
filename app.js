var express = require('express');
var app = express();

var io = require('socket.io')();

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// app.listen(port, () => {
//     console.log(`app is running on port${port}`);
// });


const server = app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});

io.attach(server);





io.on('connection', function(socket){
    console.log('a user has connected');

    socket.emit('connected', { sID:  `${socket.id}`, message: 'new connection'} );


    //listen for an incoming message from anyone connected to the app
    socket.on('chat message', function(msg) {
    console.log('message: ', msg, 'socket:', socket.id);

    //sent the messsage to everyone connected to the app
    io.emit('chat message', { id: `${socket.id}`, message: msg });

})

    socket.on('disconnect', function() {
        console.log('a user has disconnected');
    });
});