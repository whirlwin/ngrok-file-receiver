#!/usr/bin/env node

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ngrok = require('ngrok');

const UPLOAD_DIR = '/tmp/ngrok-file-receiver/';
const PORT = 8080;

// Initialize Express
const app = express();


// Set up the storage engine with Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_DIR); // Upload directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

// Initialize upload variable
const upload = multer({ storage: storage });

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(UPLOAD_DIR)){
    fs.mkdirSync(UPLOAD_DIR);
}

// Set up the POST route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log(`✅ File uploaded at ${UPLOAD_DIR}/${req.file.originalname}`);
    res.status(200).send(`File '${req.file.originalname}' uploaded successfully to receiver.`);
});

// Start the server
app.listen(PORT, async () => {
  const url = await ngrok.connect(PORT);
  console.log(`💡 Ngrok tunnel established at: ${url}`);
  console.log('ℹ️ Use /upload to upload files. Example usage:');
  console.log(`curl -XPOST ${url}/upload -F "file=@<FILENAME>"`)
});

