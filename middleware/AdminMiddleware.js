const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// const PaymentStripe = mongoose.model('payment')
// const UserRegistrateMiddleware = [
//
//     body('name').notEmpty().withMessage("Name is required"),
//     body('zip').notEmpty().withMessage("Zip is required"),
//     body('email')
//         .isEmail()
//         .withMessage("Email not match type")
//         .notEmpty()
//         .withMessage("Email is required"),
//     body('town').notEmpty().withMessage('Town is required'),
//     body('age').notEmpty().withMessage('Age is required'),
//     body('password').notEmpty().withMessage("Password is required"),
//     body('term').notEmpty().withMessage("Term is required"),
// ];
//
// const UserDeleteMiddleware = [
//     body('email', )
//         .isEmail()
//         .withMessage("Email not match type")
//         .notEmpty()
//         .withMessage("ID is required")
// ];
//
// const Verify = (req, res, next)=>{
//     try{
//
//         let accessToken = req.authorization || req.headers['authorization'];
//
//         if(!accessToken){
//             return res.status(403).send();
//         }
//
//         let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
//
//         req.id = payload.id
//         req.email = payload.email
//     }
//     catch(e){
//         return res.status(401).send(e)
//     }
//
//     next()
// }
//
// const Payment = [
//     body('credit_card_number')
//         .notEmpty()
//         .withMessage('Credit Card Number is required'),
//     body('expire_month')
//         .notEmpty()
//         .withMessage('Expiration Month is required'),
//     body('expire_year')
//         .notEmpty()
//         .withMessage('Expiration Year is required')
// ];
//
// const CheckIsExisitPayment = async (req, res) => {
//     if(req.body.email){
//
//         const findByUserId = await PaymentStripe.find({user_id:req.body.user_id});
//         if(!findByUserId){
//             return res.status(402).json({message:"You don't have a credit card. Please use credit card for subscription"});
//         }
//     }
// }
//
// let UserResetPassword = [
//     body('password').notEmpty().withMessage('Password is required'),
//     body('confirm_password').notEmpty().withMessage('Confirm Password is required')
// ];
const UserLoginMiddleware = [
    body('email', )
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email not match type"),

    body('password').notEmpty().withMessage("Password is required")
];

const ContactUs = [
    body('name')
        .notEmpty()
        .withMessage('Name is required'),
    body('email')
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email not match type"),
    body('phone')
        .notEmpty()
        .withMessage('Phone is required'),
    body('message')
        .notEmpty()
        .withMessage('Message is required')
];
module.exports = {
    // UserRegistrateMiddleware,
    // UserDeleteMiddleware,
    // UserResetPassword,
    // Verify,
    // Payment,
    UserLoginMiddleware,
    ContactUs
}