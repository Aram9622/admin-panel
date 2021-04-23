const express = require('express');
const app = express();
require('./config/config');
const bodyParser = require('body-parser');
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/admin').admin)

// 404
app.use((req, res)=>{
    res.status(404).json({message:"Page Not found 404"});
})

module.exports = app;