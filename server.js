// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Use dynamic port for deployment

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Dynamic route to handle user profile pages like /johnmaxwell
app.get('/:username', (req, res) => {
  // Serve the user.html file for this route
  res.sendFile(path.join(__dirname, 'public', 'user.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
