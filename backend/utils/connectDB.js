const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoURI = process.env.MONGO_URI;

async function connectToDb() {
  try {
    await mongoose.connect(mongoURI);
    console.log('connected to the DB');
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connectToDb };
