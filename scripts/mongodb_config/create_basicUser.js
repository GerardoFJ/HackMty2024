// Load the MongoDB, fs, and dotenv modules
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

// Connection configuration
const uri = process.env.MONGO_URI; // Get the URI from .env
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

// Read the image and convert it to a Buffer
const photoBuffer = fs.readFileSync(photoPath);

// Document to be added
const newDocument = {
  name: "Name",
  nip: 1234,
  balance: 0,
  photo: photoBuffer
};

// Main function to connect and add the document
async function main() {
  try {
    // Connect to the client
    await client.connect();
    console.log("Connected to the database");

    // Select the database
    const db = client.db("ATechM");

    // Select the collection
    const collection = db.collection("usersCollection");

    // Insert the document into the collection
    const result = await collection.insertOne(newDocument);

    // Display the result
    console.log("Document inserted:");
    console.log(result.insertedId);
  } catch (error) {
    console.error("Error connecting to the database or adding the document:", error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Execute the main function
main();