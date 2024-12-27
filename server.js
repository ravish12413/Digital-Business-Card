// Importing the required modules
const express = require('express');
const path = require('path');

// This below line creates an instance of an Express application and assigns it to the app variable. 
// This app object will be used to define routes, middleware, and other server configurations.
const app = express();
const PORT = process.env.PORT || 3000; // Use dynamic port for deployment or faalback to default 3000 if not defined

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// The Below code is for generating Manifest.json file for PWA.
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

// The below code extracts from the URL and serves the user.html file for the dynamic route
app.get('/:username', (req, res) => {
  // Serve the user.html file for this route
  res.sendFile(path.join(__dirname, 'public', 'user.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
