const mongoose = require('mongoose')
let fs = require('fs');
const models = require('./models/models')

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || '', (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
  }
});

const handler = (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.writeHead(200);

  const url = req.url.split('?')[0]
  const params = req.url.split('?')[1]

  switch (url) {
    default:
      fs.readFile(`./views/index.html`, null, function (error, data) {
        if (error) {
          res.writeHead(404);
          respone.write('Whoops! File not found!');
        } else {
          res.write(data);
        }
        res.end();
      });
      break
  }
}

// io.on('connection', client => {
//   client.emit('activate', client.id)
// })

var app = require('http').createServer(handler)
app.listen(process.env.PORT || 3000);