const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;
// mongoose.connection.on('open', function (ref) {
//     console.log('Connected to mongo server.');
//     //trying to get collection names
//     mongoose.connection.db.listCollections().toArray(function (err, names) {
//         console.log(names); // [{ name: 'dbname.myCollection' }]
//         module.exports.Collection = names;
//     });
// })
const Admin = new Schema({
    email:{
        type: String,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [isEmail, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true
    }

})
const contactUs = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    // surname: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [isEmail, 'Please fill a valid email address'],
    },
    phone: {
      type: String,
      required: true
    },
    message: {
        type: String,
        required: true
    }
    // image: {
    //     type: String
    // },
})

const Images = new Schema({
    name:{
      type: String,
      require: true
    },
    date: {
        type: Date,
        default: Date.now
    },

})
// const productSchema = new Schema({
//     cat_id:{
//         type: String,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     price: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         trim: true,
//     },
//     photo: {
//         type: String
//     },
//     status: {
//         type: Boolean,
//         default: 0
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
// });
//
// const categorySchema = new Schema({
//     title: {
//         type: String,
//     },
//     description: {
//         type: String
//     },
//     slug: {
//         type: String
//     }
// })
//
// const paymentSchema = new Schema({
//     car_id: {
//         type: String
//     },
//     user_id: {
//         type: String,
//         required: true
//     },
//     brand: {
//         type: String
//     },
//     credit_card_number: {
//         type: String,
//         required: true
//     },
//     exp_month: {
//         type: String,
//         required: true,
//     },
//     exp_year: {
//         type: String,
//         required: true
//     }
// })

// registrationSchema.pre('save', async function save(next) {
//     if (!this.isModified('password')) return next();
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         return next();
//     } catch (err) {
//         return next(err);
//     }
// });
//
// registrationSchema.methods.validatePassword = async function validatePassword(data) {
//     return bcrypt.compare(data, this.password);
// };

mongoose.model('contact', contactUs)
mongoose.model('admin', Admin)
mongoose.model('image', Images)
// mongoose.model('product', productSchema);
// mongoose.model('category', categorySchema);
// mongoose.model('payment', paymentSchema);