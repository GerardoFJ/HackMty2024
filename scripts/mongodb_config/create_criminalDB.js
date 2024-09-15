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

// Path to the folder with images
const imagesDir = path.join(__dirname, '../imgs', 'criminals');

async function main() {
  try {
    await client.connect();
    console.log("Connected to the database");

    const db = client.db("ATechM");
    const collection = db.collection("criminalsCollection");

    const files = fs.readdirSync(imagesDir);

    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      const fileBuffer = fs.readFileSync(filePath);

      const document = {
        name: path.basename(file, path.extname(file)), // File name without extension
        photo: fileBuffer
      };

      const result = await collection.insertOne(document);
      console.log(`Image ${file} uploaded with ID: ${result.insertedId}`);
    }

    console.log("Image upload completed.");
  } catch (error) {
    console.error("Error connecting to the database or uploading images:", error);
  } finally {
    await client.close();
  }
}

main();