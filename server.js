// Importing the required modules
const express = require('express');
const path = require('path');

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, must-revalidate'); // HTTP 1.1
  res.set('Pragma', 'no-cache'); // HTTP 1.0
  res.set('Expires', '0'); // Proxies
  next();
});


// This below line creates an instance of an Express application and assigns it to the app variable. 
// This app object will be used to define routes, middleware, and other server configurations.
const app = express();
const PORT = process.env.PORT || 8000; // Use dynamic port for deployment or faalback to default 3000 if not defined

// Cache Busting for global resources
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, must-revalidate'); // HTTP 1.1
  res.set('Pragma', 'no-cache'); // HTTP 1.0
  res.set('Expires', '0'); // Proxies
  next();
});

// Cache control specifically for index.html (override global cache for index.html)
app.get('/index.html', (req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate'); // Ensure no cache for index.html
  res.set('Pragma', 'no-cache'); // HTTP 1.0
  res.set('Expires', '0'); // Proxies
  next();
}, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  // Serve the index.html file
});


// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


// The Below code is for generating Manifest.json file for PWA.
app.get("/:username/manifest.json", (req, res) => {
  const { username } = req.params;
  const manifest = {
    version: "1.1",
    name: `${username} Card`,
    short_name: `${username} Card`,
    start_url: `/${username}/pwa.html`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#c01e2e",
    icons: [
      {
        src: "/image/mmt.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/image/mmt512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };

  res.setHeader("Content-Type", "application/json");
  res.json(manifest);
});
app.get("/:username/pwa.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pwa.html"));
});

// The below code extracts from the URL and serves the user.html file for the dynamic route
app.get('/:username', (req, res) => {
  // Serve the user.html file for this route
  res.sendFile(path.join(__dirname, 'public', 'user.html'));
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
