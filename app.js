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
    console.log('a user has connected', socket);

    socket.on('disconnect', function(){
        console.log('a user has disconnected');
    });
});