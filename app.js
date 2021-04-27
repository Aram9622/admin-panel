const express = require('express');
const app = express();
var cors = require('cors')
var corsOptions = {
    origin: function (origin, callback) {
      // db.loadOrigins is an example call to load
      // a list of origins from a backing database
      db.loadOrigins(function (error, origins) {
        callback(error, origins)
      })
    }
  }
require('./config/config');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const path = require('path')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/images'))

app.use(require('./routes/admin').admin, cors(corsOptions))

// 404
// app.use((req, res)=>{
//     res.status(404).json({message:"Page Not found 404"});
// })

module.exports = app;