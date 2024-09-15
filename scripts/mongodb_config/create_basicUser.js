const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Connection configuration
const uri = 'mongodb+srv://tacolon27:9DpZSCqmoC10ABkf@hackmty2024.90ahx.mongodb.net/?retryWrites=true&w=majority&appName=HackMTY2024';
if (!uri) {
  throw new Error("MONGO_URI not found in .env file");
}

// Create an instance of the MongoDB client
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Image path
const photoPath = path.join(__dirname, '../imgs', 'user_picture.jpg');

const photoBuffer = fs.readFileSync(photoPath);

// Document to be added
const newDocument = {
  name: "Gilberto",
  nip: 1234,
  balance: 100,
  photo: photoBuffer
};

async function main() {
  try {
    await client.connect();
    console.log("Connected to the database");

    const db = client.db("ATechM");
    const collection = db.collection("usersCollection");

    const result = await collection.insertOne(newDocument);

    console.log("Document inserted:");
    console.log(result.insertedId);
  } catch (error) {
    console.error("Error connecting to the database or adding the document:", error);
  } finally {
    await client.close();
  }
}

main();