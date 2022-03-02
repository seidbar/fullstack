require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;
const Person = require('./models/person');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    console.log(error.message);
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ');
  })
);

app.get('/', (request, response) => {
  response.send('<p>Welcome to the phonebook API!</p>');
});

app.get('/info', (request, response) => {
  const date = new Date().toUTCString();
  Person.find({}).then((people) => {
    response.send(
      `<p>Phonebook has info for ${people.length} people</p><p>${date}</p>`
    );
  });
});

app.get('/api/people', (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.post('/api/people', (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
    id: Math.ceil(Math.random() * 12000),
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.get('/api/people/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) response.json(person);
      else response.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete('/api/people/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

app.put('/api/people/:id', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then(() => response.status(200).end())
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
