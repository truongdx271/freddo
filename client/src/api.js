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

function invoiceUpdate(cb) {
  socket.on(events.INVOICE_UPDATE_DESK, order => cb(order));
}

function invoiceRequest(cb) {
  socket.on(events.INVOICE_REQUEST_DESK, order => cb(order));
}

function invoiceComplete(table) {
  socket.emit(events.INVOICE_COMPLETE, table);
}

function onInvoiceComplete(cb) {
  socket.on(events.INVOICE_COMPLETE_DESK, table => cb(table));
}

function leaveQueue(order) {
  socket.emit(events.INVOICE_LEAVE_QUEUE, order);
}

function onLeaveQueue(cb) {
  socket.on(events.INVOICE_LEAVE_QUEUE_DESK, order => cb(order));
}

function updateTable(cb) {
  socket.on(events.TABLE_UPDATE_DESK, table => cb(table));
}

export {
  subscribeToTimer,
  iotest,
  invoiceUpdate,
  invoiceRequest,
  invoiceComplete,
  leaveQueue,
  updateTable,
  onInvoiceComplete,
  onLeaveQueue
};
