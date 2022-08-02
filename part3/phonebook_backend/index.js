require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(express.static("build"));
app.use(express.json());
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(cors());

app.get("/api/persons", (request, response) =>
  Person.find({}).then((newPersons) => response.json(newPersons))
);

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number)
    return response.status(400).json({ error: "content missing" });
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => response.json(savedPerson));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  Person.count({}).then((count) => {
    const html = `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`;
    response.send(html);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      person
        ? response.json(person)
        : response.status(404).end({ error: "person not found" });
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const contact = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then((updatedContact) => response.json(updatedContact))
    .catch((error) => next(error));
});

// Unknown endpoint middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// Error handler middleware
const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError")
    return response.status(400).end({ error: "malformed id" });
  next(error);
};
app.use(errorHandler);

// Heroku sets the env PORT, so we use that on Heroku in production and default to 3001 in development
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
