var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: { type: string },
    address: { type: string },
    phone: { type: string }
}, { collection: 'user' })

module.exports = mongoose.model('user', userSchema)




var productSchema= mongoose.Schema({
    name:{type:string},
    roll:{type:string},
    phone:{type:string},
    email:{type:string},
},{collection: 'product'})

module.exports = mongoose.model('product',productSchema)