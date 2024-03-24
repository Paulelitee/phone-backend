const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
morgan.token('req-body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :req-body}`))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//function to generate random id
function generateId ()  {
    return Math.round(Math.random() * 10000000)
}


//route to get all persons
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//info rroute
app.get('/api/info', (request, response) => {
    response.send(
        `<p>phonebook has info for ${persons.length} people</p>
        ${new Date().toLocaleString()}`
        
    )
})

//route to get one single person
app.get('/api/persons/:id', (request, response) => {
   const id = Number(request.params.id)
   const person = persons.find(person => person.id === id)

    person ? response.send(person) : response.status(404).end()
})

//route to delete a single person from db
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

//route for adding persons to the phonebook
app.post('/api/persons', (request, response) => {
    const person = request.body

    if(!person.name || !person.number)   {
        return response.status(404).json({
            error: 'missing input'
        })
    }
    else if(persons.find(find => find.name === person.name)){
        return response.status(404).json({
            error: 'name already exists'
        })
    } 

    else {
    const newPerson = {
        ...person, id: generateId()
    }
    console.log(newPerson)

    persons = persons.concat(newPerson)
    response.json(newPerson)
}
})


const PORT = 4001
app.listen(PORT, () => {
    console.log(`server runningg on port ${PORT}`)
})