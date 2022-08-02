const mongoose = require("mongoose");

if (process.argv.length != 3 && process.argv.length != 5) {
  console.log("Incorrect number of params.");
  process.exit(1);
}

// Set up Person model
const personSchema = new mongoose.Schema({
  name: "string",
  number: "string",
});
const Person = mongoose.model("Person", personSchema);

// Connect to db
const password = process.argv[2];
const url = `mongodb+srv://fullstackuser:${password}@cluster0.dkoab.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(url);

// Fetch all data
if (process.argv.length == 3) {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.map((p) => console.log(p.name + " " + p.number));
    mongoose.connection.close();
  });
}

// Push data to db
else {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  newPerson.save().then((res) => {
    console.log(`added ${res.name} number ${res.number} to phonebook`);
    mongoose.connection.close();
  });
}
