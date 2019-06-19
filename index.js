var app = require('http').createServer(handler)
const mongoose = require('mongoose');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

const SAccount = new mongoose.Schema({
  account: String,
  pending: Boolean,
  check: Boolean,
  pause: Boolean,
  del: Boolean,
});
const MAccount = mongoose.model('Account', SAccount, 'accounts');


function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);

  const url = req.url.split('?')[0]
  const params = req.url.split('?')[1]

  switch (url) {
    default:
      res.end(JSON.stringify({ index: true }));
      break
  }
}

// io.on('connection', client => {
//   client.emit('activate', client.id)
// })

app.listen(process.env.PORT || 3000);