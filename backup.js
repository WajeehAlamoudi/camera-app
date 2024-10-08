// backup.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json({ limit: '10mb' })); // Handle large image data

// Endpoint to handle image uploads
app.post('/upload', (req, res) => {
    const imageData = req.body.image; // Image data sent from the client

    // Check if imageData exists
    if (!imageData) {
        return res.status(400).json({ message: 'No image data received.' });
    }

    // Remove the data URL part and get only the base64 encoded string
    const base64Data = imageData.replace(/^data:image\/png;base64,/, '');

    // Create a unique filename for the image
    const filename = `captured-image-${Date.now()}.png`;

    // Save the image to the server
    fs.writeFile(path.join(__dirname, filename), base64Data, 'base64', (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error saving the image.' });
        }
        res.status(200).json({ message: 'Image saved successfully!', filename });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
