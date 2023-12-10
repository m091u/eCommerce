// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://mirabela_tiugan:rinmtuOltJBrB@cluster0.tuqlrtv.mongodb.net/greenmind?retryWrites=true&w=majority'
  // || "mongodb://127.0.0.1:27017/ecommerce-server";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
