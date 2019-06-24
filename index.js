const mongoose = require('mongoose')
const Models = require('./client/src/models/models')

const M = {}
Object.keys(Models).forEach(k => {
  const a = {}
  const model = Models[k]
  const schema = Object.keys(model).map(k => a[k] = model[k].mongoDB || model[k])
  M[k] = mongoose.model(k, new mongoose.Schema(schema))
})

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://heroku_p2h3kjzg:1l3nvjb34h67feigdavvuof03g@ds239797.mlab.com:39797/heroku_p2h3kjzg', (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!', error); // eslint-disable-line no-console
  }
});

const handler = (req, res) => {
  const send = (data, err = false) => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }

    // res.writeHead(err ? 500 : 200, headers)
    res.end(JSON.stringify({ data }))
  }

  if (req.method === 'POST') {
    const { path, formData } = req.body

    switch (req.baseUrl) {
      case '/api/postModel':
        const model = M[path]
        console.log(model)
        const entry = new model(formData)

        entry.save((err, savedEntry) => send(savedEntry, err))
      default:
        send({ url: req.url, body: req.body })
    }
  }
  else {
    switch (req.url) {
      case '/':
        res.end(JSON.stringify({ index: true }));
    }
  }
}

// io.on('connection', client => {
//   client.emit('activate', client.id)
// })

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Put all API endpoints under '/api'
app.use('/api/*', handler);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(process.env.PORT || 5000);