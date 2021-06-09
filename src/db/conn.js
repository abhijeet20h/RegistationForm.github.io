const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/formvalidator', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('connecting..........')
})
.catch((e)=>{
    console.log('no connection')
})