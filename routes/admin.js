const express = require('express');
const admin = express.Router();
const cors = require('cors')
const corsOptions = {
    origin: function (origin, callback) {
      // db.loadOrigins is an example call to load
      // a list of origins from a backing database
      db.loadOrigins(function (error, origins) {
        callback(error, origins)
      })
    }
  }
require('../db/Schema/Admin');
// Middleware
const {
    UserLoginMiddleware,
    ContactUs
} = require('../middleware/AdminMiddleware');
// const { ProductMiddleware, CategoryMiddleware } = require('../middleware/ProductMiddleware');
const  { upload } = require('../middleware/StorageMiddleware');
// Controller
const controller = require('../controllers/AdminController');
// const productController = require('../controllers/ProductController');

// ********************* Routes *********************

//user
admin.post('/login', UserLoginMiddleware, controller.UserLogin);
// product
admin.post('/store', upload.array('photo'), controller.UploadImages);
admin.get('/get-all', cors(corsOptions), controller.GetAllImages)
admin.post('/contact', ContactUs,  controller.ContactUs);
module.exports = { admin }