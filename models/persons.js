const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

//getting url from environment variables
const url = process.env.MONGODB_URI

//initiating database connection
console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('errror connecting to MoongoDB:', error.message)
  })

//function to handle custom validation for number input
const numberValidator = (v) => {
  const regex =/^(?:\d{8,}|\d{2,3}-\d{6,})$/
  return regex.test(v)
}

//declaring the database schema
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

//transforing the database schema
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


//EXPORTS
module.exports = mongoose.model('Person', personSchema)