const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons.js')

//declaring middleware
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
morgan.token('req-body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :req-body}`))


//function to generate random id
function generateId ()  {
    return Math.round(Math.random() * 10000000)
}


//route to get all persons
app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

//info rroute
app.get('/info', (request, response) => {
    Person.find({})
        .then(data => {
            let persons = data
            response.send(
                `<p>phonebook has info for ${persons.length} people</p>
                ${new Date().toLocaleString()}`)
            })
})

//route to get one single person
app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
        .then(
            person => {
                if(person){
                    response.json(person)
                }   else {
                    response.status(404).end()
                }
            }
        )
        .catch(error => next(error))
})

//route to delete a single person from db
app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    
    Person.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

//route for adding persons to the phonebook
app.post('/api/persons', (request, response, next) => {
    const person = request.body

    const newPerson = new Person({
        ...person, id: generateId()
    })
    console.log(newPerson)

    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => next(error))
})


//route to handle editing of numbers
app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const payload = request.body
    
    const person = {
        content: payload.name,
        number: payload.number
    }


    Person.findByIdAndUpdate(id, person,
                            {new: true, runValidators: true, context: 'query'})
        .then(data => response.json(data))
})

//handling unknown endpoints
const unknownEndpoints = (request, response )=> {
    response.status(404).send({error: 'unkown endpoint'})
}

app.use(unknownEndpoints)
//function to handle errors
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({error: 'malforatted id'})
    }   else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server runningg on port ${PORT}`)
})