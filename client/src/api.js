import openSocket from 'socket.io-client';

const url = 'http://localhost:8080';
const socket = openSocket(url);
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer };
