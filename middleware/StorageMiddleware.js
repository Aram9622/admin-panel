const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split('/');
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({storage})


// const product = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "product")
//     },
//     filename: function (req, file, cb) {
//         const parts = file.mimetype.split('/');
//         cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
//     }
// })
//
// const productUpload = multer({storage:product})
module.exports = {
    upload,
    // productUpload
}