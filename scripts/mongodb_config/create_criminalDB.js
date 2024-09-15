// Load the MongoDB, fs, path, and dotenv modules
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

// Connection configuration
const uri = process.env.MONGO_URI; // Get the MongoDB URI from .env
if (!uri) {
  throw new Error("MONGO_URI not found in .env file");
}

// Create an instance of the MongoDB client
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Path to the folder with images
const imagesDir = path.join(__dirname, 'imgs', 'criminals');

// Main function to connect, read images, and upload them to the collection
async function main() {
  try {
    // Connect to the client
    await client.connect();
    console.log("Connected to the database");

    // Select the database
    const db = client.db("ATechM");

    // Select the collection
    const collection = db.collection("criminalsCollection");

    // Read all the files in the images folder
    const files = fs.readdirSync(imagesDir);

    // Process each file
    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      const fileBuffer = fs.readFileSync(filePath);

      // Create a document to insert
      const document = {
        name: path.basename(file, path.extname(file)), // File name without extension
        photo: fileBuffer
      };

      // Insert the document into the collection
      const result = await collection.insertOne(document);
      console.log(`Image ${file} uploaded with ID: ${result.insertedId}`);
    }

    console.log("Image upload completed.");
  } catch (error) {
    console.error("Error connecting to the database or uploading images:", error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Execute the main function
main();