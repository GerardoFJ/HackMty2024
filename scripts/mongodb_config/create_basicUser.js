const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Connection configuration
const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI not found in .env file");
}

// Create an instance of the MongoDB client
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Image path
const photoPath = path.join(__dirname, '../imgs', 'users', 'user_image.jpeg');

const photoBuffer = fs.readFileSync(photoPath);

// Document to be added
const newDocument = {
  name: "Name",
  nip: 1234,
  balance: 0,
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