const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('play', (time) => {
        socket.broadcast.emit('play', time);
    });

    socket.on('pause', () => {
        socket.broadcast.emit('pause');
    });

    socket.on('seek', (time) => {
        socket.broadcast.emit('seek', time);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('sync', (time) => {
        socket.broadcast.emit('sync', time);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// bug:
// to work, tab1 must play and pause, then tab2 must play (and syncing will begin)