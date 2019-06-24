const mongoose = require('mongoose')
let fs = require('fs');
const Models = require('./client/src/models/models')

const parseModel = (name) => {
  const a = {}
  const model = Models[name]
  const schema = Object.keys(model).map(k => a[k] = model[k].mongoDB || model[k])
  return schema && mongoose.model(name, new mongoose.Schema(schema))
}

// MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://heroku_p2h3kjzg:1l3nvjb34h67feigdavvuof03g@ds239797.mlab.com:39797/heroku_p2h3kjzg', (error) => {
//   if (error) {
//     console.error('Please make sure Mongodb is installed and running!', error); // eslint-disable-line no-console
//   }
// });

const send = (res, response, err) => {
  res.writeHead((err && 500) || 200);
  res.end(JSON.stringify({ response }))
}

const handler = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const url = req.url.split('?')[0]
  let params

  if (req.method === 'POST') {
    params = '';
    req.on('data', chunk => {
      params += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
      params = JSON.parse(params)

      switch (url) {
        case '/postModel':
          const M = parseModel(params.path)
          const entry = new M(params.formData)

          entry.save((err, ok) => {
            send(res, err || ok, true)
          })
        default:
          res.end(JSON.stringify({ params, url }))
      }
    });
  }
  else {
    params = req.url.split('?')[1]

    switch (url) {
      case '/':
        res.end(JSON.stringify({ index: true }));
    }
  }

}

// io.on('connection', client => {
//   client.emit('activate', client.id)
// })

// var app = require('http').createServer(handler)
// app.listen(process.env.BACK_PORT || 3001);

const express = require('express');
const path = require('path');
const app = express();

// Put all API endpoints under '/api'
app.get('/api/postModel', handler);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(5000);