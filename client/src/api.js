import openSocket from 'socket.io-client';

const url = 'https://socket-freddo-cyberjunky.c9users.io';
const socket = openSocket(url);
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 5000);
}
export { subscribeToTimer };
