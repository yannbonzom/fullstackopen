const mongoose = require("mongoose");

// Connect to db
const url = process.env.MONGODB_URI;
console.log("Connecting to", url);
mongoose
  .connect(url)
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log("Error connecting to db: ", err.message));

// Set up Person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    validate: {
      validator: (n) => {
        const regex = /^[0-9]{8,}$|^[0-9]{2}-[0-9]{6,}$|^[0-9]{3}-[0-9]{5,}/;
        return regex.test(n);
      },
    },
  },
});

// Modify the returned format so that frontend only receives id, name, and number
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Export the Person model
module.exports = mongoose.model("Person", personSchema);
