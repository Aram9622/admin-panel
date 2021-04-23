const express = require('express');
const admin = express.Router();
require('../db/Schema/Admin');
// Middleware
const {
    // UserRegistrateMiddleware,
    // UserDeleteMiddleware,
    // UserResetPassword,
    // Verify,
    // Payment,
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
// app.post('/registration',  UserRegistrateMiddleware, controller.UserRegistration);
admin.post('/login', UserLoginMiddleware, controller.UserLogin);
// app.post('/edit', Verify,  controller.UserUpdate);
// app.post('/edit/access', Verify, upload.single('image'), controller.UserUpdate);
// app.post('/reset', controller.ResetPassword)
// app.post('/reset/code', controller.ResetPassword);
// app.post('/reset/password', UserResetPassword, controller.ResetPassword)
// app.delete('/delete', UserDeleteMiddleware, controller.UserDelete)

// product
admin.post('/store', upload.array('photo'), controller.UploadImages);
admin.get('/get-all', controller.GetAllImages)
admin.post('/contact', ContactUs, controller.ContactUs);
module.exports = { admin }