// Importing required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./src/routes");

const app = express();
const PORT = process.env.PORT || 8000; // Use dynamic port or fallback to 8000

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To handle JSON data

// Cache Busting for global resources
app.use((req, res, next) => {
  res.set("Cache-Control", "no-cache, must-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

// ✅ Serve index.html properly
app.get("/index.html", (req, res) => {
  res.set("Cache-Control", "no-cache, no-store, must-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Load all defined routes
app.use("/", routes);

// ✅ Serve PWA manifest dynamically
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
      { src: "/image/mmt.png", sizes: "192x192", type: "image/png" },
      { src: "/image/mmt512.png", sizes: "512x512", type: "image/png" },
    ],
  };
  res.setHeader("Content-Type", "application/json");
  res.json(manifest);
});

// ✅ Serve PWA HTML file
app.get("/:username/pwa.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pwa.html"));
});

// The below code extracts from the URL and serves the user.html file for the dynamic route
app.get("/:username", (req, res) => {
  // Serve the user.html file for this route
  res.sendFile(path.join(__dirname, "public", "user.html"));

  // res.render("user", { username: req.params.username });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
