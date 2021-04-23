const express = require('express');
const app = express.Router();
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
app.post('/login', UserLoginMiddleware, controller.UserLogin);
// app.post('/edit', Verify,  controller.UserUpdate);
// app.post('/edit/access', Verify, upload.single('image'), controller.UserUpdate);
// app.post('/reset', controller.ResetPassword)
// app.post('/reset/code', controller.ResetPassword);
// app.post('/reset/password', UserResetPassword, controller.ResetPassword)
// app.delete('/delete', UserDeleteMiddleware, controller.UserDelete)

// product
app.post('/store', upload.array('photo'), controller.UploadImages);
app.post('/contact', ContactUs, controller.ContactUs);
// app.post('/category', CategoryMiddleware, productController.StoreCategory);
// app.get('/category/:slug', productController.GetBySlugCategory)
// app.get('/products', productController.GetProductsByRangePrice)

// payment
// app.post("/payment", Payment, controller.Payment);
module.exports = app