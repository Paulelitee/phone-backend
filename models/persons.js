const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('errror connecting to MoongoDB:', error.message)
    })

    
    const numberValidator = (v) => {
        const regex =/^(?:\d{8,}|\d{2,3}-\d{6,})$/
        return regex.test(v)
    }

    const personSchema = new mongoose.Schema({
        name: {
            type: String,
            minLength: 3,
            required: true
        },
        number: {
            type: String,
            minLength: 8,
            required: true,
            validate: [(v) => numberValidator(v),
                       'invalid number']
            
        }
    })
    
    personSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
        }
    })
    
    module.exports = mongoose.model('Person', personSchema)