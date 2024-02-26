const socket = io();
const videoPlayer = document.getElementById('videoPlayer');

let ignoreEvents = false;

videoPlayer.addEventListener('play', () => {
    if (!ignoreEvents) {
        const time = videoPlayer.currentTime;
        socket.emit('play', time);
    }
});

videoPlayer.addEventListener('pause', () => {
    if (!ignoreEvents) {
        socket.emit('pause');
    }
});

videoPlayer.addEventListener('seek', () => {
    if (!ignoreEvents) {
        const time = videoPlayer.currentTime;
        socket.emit('seek', time);
    }
});

socket.on('play', (time) => {
    ignoreEvents = true;
    videoPlayer.currentTime = time;
    videoPlayer.play().then(() => ignoreEvents = false);
});

socket.on('pause', () => {
    ignoreEvents = true;
    videoPlayer.pause();
    ignoreEvents = false;
});

socket.on('seek', (time) => {
    ignoreEvents = true;
    videoPlayer.currentTime = time;
    ignoreEvents = false;
});