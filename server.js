// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Use dynamic port for deployment

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:username/manifest.json', (req, res) => {
  const { username } = req.params; // Extract the username from the URL
  // const currentUrl = `${req.protocol}://${req.get('host')}/${username}`; // Construct the dynamic URL
  
  const manifest = {
    name: `Digital Business Card`,
    short_name: `MMT Card`,
    start_url: `https://pwatest-phi.vercel.app/zebronics`, // Dynamic URL for the user's PWA
    id: `${username}`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#c01e2e",
    icons: [
      {
        src: "/image/mmt.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/image/mmt512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };

  res.setHeader("Content-Type", "application/json");
  res.json(manifest); // Respond with the dynamic manifest as JSON
});

// Dynamic route to handle user profile pages like /johnmaxwell
app.get('/:username', (req, res) => {
  // Serve the user.html file for this route
  res.sendFile(path.join(__dirname, 'public', 'user.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
