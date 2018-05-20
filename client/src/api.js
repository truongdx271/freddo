import openSocket from 'socket.io-client';
import { events, url } from './utils/socketEvents';

const socket = openSocket(url.URL);
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

function iotest(cb) {
  // socket.on(events.IOTESTDESK, data => cb(data));
  socket.on(events.IOTESTDESK, data => cb(data));
  // socket.emit(events.IOTEST, 'hahaha');
}

function invoiceUpdate(cb) {}

export { subscribeToTimer, iotest };
