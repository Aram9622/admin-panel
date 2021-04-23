const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/TodoDb', {
//     useCreateIndex: true,
//     useFindAndModify: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log('server started!')
// }).catch(err => console.log(err));


mongoose.connect('mongodb+srv://Aram:Aram19962209@todolist.by47v.mongodb.net/AdminPanel?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('server started!')
}).catch(err => console.log(err));