const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const role = require('./routes/api/role');
const menugroup = require('./routes/api/menugroup');
const menuitem = require('./routes/api/menuitem');
const table = require('./routes/api/table');
const group = require('./routes/api/group');
const order = require('./routes/api/order');
const importitem = require('./routes/api/importitem');

const keys = require('./config/keys');

const app = express();

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/role', role);
app.use('/api/menugroup', menugroup);
app.use('/api/menuitem', menuitem);
app.use('/api/table', table);
app.use('/api/group', group);
app.use('/api/order', order);
app.use('/api/importitem', importitem);

const port = process.env.PORT || 8080;

const server = require('http').createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));

// Config socket.IO
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('subscribeToTimer', interval => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      socket.emit('timer', new Date());
    }, interval);
  });

  socket.on(keys.IOTEST, data => {
    console.log(data);
    // io.sockets.emit(keys.IOTESTDESK, data);
    socket.broadcast.emit(keys.IOTESTDESK, data);
  });

  // Trigger when a create or edit an order
  socket.on(keys.INVOICE_UPDATE, order => {
    console.log('Order updating...');
    socket.broadcast.emit(keys.INVOICE_UPDATE_DESK, order);
  });

  // Trigger when a a request to pay
  socket.on(keys.INVOICE_REQUEST, order => {
    console.log('Requesting to pay...');
    socket.broadcast.emit(keys.INVOICE_REQUEST_DESK, order);
  });
});
