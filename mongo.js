const mongoose = require("mongoose")

if(process.argv.length < 3) {
    console.log('give password an arguement')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://paulelite:${password}@cluster0.bugt6sy.mongodb.net/people?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

if(process.argv.length > 4) {
return newPerson.save()
    .then(data => {
        console.log(`added ${newPerson.name} ${newPerson.number} to phonebook`)
        mongoose.connection.close()
    })
}

else Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name)
    })
    mongoose.connection.close()
  })