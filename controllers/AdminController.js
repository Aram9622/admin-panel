require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const Admin = mongoose.model('admin')
const Images = mongoose.model('image')
const Contact = mongoose.model('contact')
// const PaymentStripe = mongoose.model('payment')
const {validationResult} = require('express-validator');
// const Mailer = require('../src/helper/Mailer');
// const stripe = require('stripe')('sk_test_51I9Uu1C7mhOxVRLqIulpRS2JBERTdL58mpV8BJYnvZyaU8pyA5Y5lnvk4RYoRCi8vQGY2RD0kpaDNEK4mTwqBGOP00hxCEB0H0');
//
// let UserRegistration = async (req, res) => {
//     let errorMessage = [];
//     const { name, zip, town, age, email, password, confirm_password } = req.body;
//     if(password !== confirm_password){
//         errorMessage.push({message:{msg:"Password not match confirm password. Please enter correct password"}});
//     }
//     // if (!req.file) {
//     //     console.log('here');
//     //     errorMessage.push({message: {msg: "You must select an image."}})
//     // }
//     if (validationResult(req).errors.length || errorMessage.length) {
//         // if (req.file) {
//         //     fs.unlink(req.file.path, err => {
//         //         console.log(err);
//         //     })
//         // }
//         errorMessage.push({message: validationResult(req).errors})
//         return res.status(404).json({errors: errorMessage})
//     }
//     let user = await User.findOne({email: req.body.email});
//     if (user) {
//         // if (req.file) {
//         //     fs.unlink(req.file.path, (err) => {
//         //         if (err) {
//         //             console.log(err);
//         //         }
//         //     })
//         // }
//         return res.status(409).json({message: "Email is exists please change your email"});
//     }
//     let user_create = new User({
//         name,
//         zip,
//         town,
//         age,
//         email,
//         password,
//         accessUpdate: '123456aaaaa'
//         // image: req.file.filename,
//     });
//
//     await user_create.save();
//
//     res.status(200).json({message: "Successfully registered"});
// }

let UserLogin = async (req, res) => {
    const { email } = req.body
    if (validationResult(req).errors.length) {
        return res.status(409).send({message: validationResult(req).errors})
    }
    const admin = await Admin.findOne({email});
    if (!admin) {
        return res.status(409).json({message: "Email not found"});
    }
    const isEqual = await bcrypt.compare(req.body.password, admin.password);
    if (!isEqual) {
        return res.status(401).json({message: 'Password not match. Please change password!'});
    }
    const userToken = {
        id: admin.id,
        name: admin.name,
        email: admin.email
    }
    const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
    });

    res.status(200).json({
        accessToken,
        user: {
            id: admin.id,
            email: admin.email,
        }
    });

}

let ContactUs = async (req, res) => {
    try {
        let errorMessage = [];
        const { name, email, phone, message } = req.body;
        if (validationResult(req).errors.length || errorMessage.length) {
            errorMessage.push({message: validationResult(req).errors})
            return res.status(401).json({errors: errorMessage})
        }
        let contactCreate = new Contact({
            name,
            email,
            phone,
            message
        });

        await contactCreate.save();

        res.status(200).json({message: "Successfully added"});
    } catch (err) {
        res.status(400).json({error: err});
    }
}

let UploadImages = async (req, res) => {
    // console.log(req.files)
    let errorMessages = [];
    let fileNames = [];
    req.files.map((item)=>{
        fileNames.push(item.filename);

    })
    if (!req.files) {
        errorMessages.push({message: {msg: "You must select an image."}})
    }
    if (validationResult(req).errors.length || errorMessages.length) {
        if (req.files) {
            // fs.unlink(req.files.path, err => {
            //     console.log(err);
            // })
        }
        errorMessages.push({message: validationResult(req).errors})
        return res.status(404).json({errors: errorMessages})
    }

    let storeImage = new Images({
        name: JSON.stringify(fileNames),
    })

    if(!storeImage){
        return res.status(409).json({message: "Server Error!"});
    }
    await storeImage.save()
    res.status(200).json({message: "Successfully store", data: JSON.parse(storeImage.name)});
}

let GetAllImages = async (req, res) => {
    const images = await Images.find();
    let fileName = [];
    images.map((item)=>{
        JSON.parse(item.name).map((item2)=>{
            fileName.push(req.get('host')+'/images/'+item2);
        })
    })
    console.log(fileName)
    res.status(200).json({images: fileName});
}

//
// let UserUpdate = async (req, res) => {
//     const _id = req.id;
//     const {name, surname} = req.body;
//     let accessCode = await bcrypt.hash('123456', 5);
//     if(!req.body.accessCode) {
//         const access = await User.findByIdAndUpdate({_id}, {"accessUpdate": accessCode});
//         if (access) {
//             const getAccessCode = await User.findById({_id});
//             await Mailer(getAccessCode.accessUpdate, getAccessCode.email);
//             return res.status(200).json({message: "Please check your email, we sent access code for update"});
//         }
//     }
//     const checkAccess = await User.findById({_id});
//     if(checkAccess.accessUpdate === req.body.accessCode){
//         const { image } = checkAccess;
//         const file = req.file ? req.file.filename : ''
//         if(fs.existsSync("images/"+image)){
//             fs.unlink('images/'+image, (err) => {
//                 if (err) {
//                     fs.unlinkSync(req.file.path)
//                     return res.status(501).json({message: "Server error!"})
//                 }
//             })
//         }
//
//         const update = await User.findByIdAndUpdate({_id}, {
//             "name":name,
//             "surname":surname,
//             "image":file
//         },{useFindAndModify: false});
//
//         if(!update){
//             return res.status(409).json({message:"Server error!. Please try again"});
//         }
//         return res.status(200).json({message:"Successfully updated your data!"})
//     }
//     else{
//         return res.status(409).json({message: "Access code is not equal!. Please enter access code which the sent in your email."});
//     }
// }
//
// let ResetPassword = async (req, res)=>{
//     if(!req.body.email){
//         return res.status(409).json({message: 'Email is required'});
//     }
//     const { email } = req.body
//     const findEmail = await User.findOne({email});
//     if(!findEmail){
//         return res.status(404).json({message:"Please enter your email which the save in registration form"})
//     }
//     const _id = findEmail.id;
//     if(!req.body.password && !req.body.accessCode){
//         const randomPass = '#' + Math.ceil(Math.random() * 100000);
//         const updatePassword = await User.findByIdAndUpdate({_id}, {"accessUpdate": randomPass},{useFindAndModify: false});
//         if(!updatePassword){
//             return res.status(409).json({message: "Server Error!"});
//         }
//         await Mailer(randomPass, req.body.email);
//         res.status(200).json({message:"Please check your email, we sent reset code for update"});
//     }
//     else if(!req.body.password){
//         const accessCode = findEmail.accessUpdate;
//         if(accessCode !== req.body.accessCode){
//             return res.status(406).json({message:"Access code not match. Please enter access code which the sent your email ( "+findEmail.email+" )" })
//         }
//         res.status(200).json({message: "Success"});
//     }
//     else{
//         const pass = req.body.password;
//         const confirm_password = req.body.confirm_password;
//         if(pass !== confirm_password){
//             return res.status(409).json({message:"Password not match confirm password"});
//         }
//         const hashPassword = await bcrypt.hash(pass, 5)
//
//         const updatePassword = await User.findByIdAndUpdate({_id}, {"password": hashPassword},{useFindAndModify: false});
//         if(!updatePassword){
//             return res.status(409).json({message:"Server Error!"});
//         }
//         res.status(200).json({message:"Successfully update your password. Please go to login page and enter your new password!"});
//     }
//
//
// }
//
// let UserDelete = async (req, res) => {
//
//     if (validationResult(req).errors.length) {
//         return res.status(409).send({message: validationResult(req).errors.map(errItem => errItem.msg)})
//     }
//
//     const uId = await User.find({email: req.body.email});
//
//     if (!uId) {
//         return res.status(404).send({message: "Not found row"});
//
//     }
//
//     await User.remove({email: req.body.email}, function (err) {
//         if (err) console.log(err);
//         res.status(200).send({message: "Successfully deletion"});
//     });
// }
//
// let Payment = async (req, res) => {
//
//     let errorMessage = [];
//
//     const {
//         email,
//         credit_card_number,
//         expire_month,
//         expire_year,
//         security_code
//     } = req.body;
//
//     if (validationResult(req).errors.length || errorMessage.length) {
//         errorMessage.push({message: validationResult(req).errors})
//         return res.status(404).json({errors: errorMessage})
//     }
//     const findByEmail = await User.findOne({email});
//     if(!findByEmail){
//         return res.status(409).json({message:"Not found this email"});
//     }
//     const user_id = findByEmail.id;
//     try{
//         const token = await stripe.tokens.create({
//             card: {
//                 number: credit_card_number,
//                 exp_month: parseInt(expire_month),
//                 exp_year: parseInt(expire_year),
//                 cvc: security_code,
//             },
//         })
//         const { id, brand, exp_month, exp_year, last4 } = token.card;
//
//         const payment = new PaymentStripe({
//             card_id: id,
//             brand,
//             user_id,
//             credit_card_number: last4,
//             exp_month,
//             exp_year
//         });
//
//         await payment.save();
//
//         if(!payment){
//             return res.status(500).json({message:"Server Error!"});
//         }
//
//         const pay = await stripe.charges.create({
//             amount: 5520,
//             currency: "rub",
//             source: "tok_" + brand.toLowerCase(), // obtained with Stripe.js',
//             metadata: {'order_id': '6735'}
//         });
//
//         res.status(201).json({message: "Your credit card added successfully!"});
//     }catch (e) {
//         console.log(e)
//
//         return res.status(e.raw.statusCode).json({message:e.raw.message});
//     }
// }

module.exports = {
    // UserRegistration,
    UserLogin,
    ContactUs,
    UploadImages,
    GetAllImages
    // UserDelete,
    // UserUpdate,
    // ResetPassword,
    // Payment
}