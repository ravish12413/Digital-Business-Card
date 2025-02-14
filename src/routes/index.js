const emailjs = require("@emailjs/nodejs");
const express = require("express");
const router = express.Router();

// Render the contact page
router.get("/contact", (req, res) => {
  res.render("contact"); // Load the contact.ejs form
});

// Handle form submission and send an email
router.post("/submit-contact", (req, res) => {
  const { email, name, phone, message } = req.body;

  if (!email || !phone || !message) {
    return res
      .status(400)
      .json({ status: false, message: "All fields are required" });
  }

  console.log("Received Contact Form Data:", req.body);
  const templateParams = { email, phone, message };

  emailjs
    .send("service_k2tou3o", "template_3gif2bg", templateParams, {
      publicKey: "wV1BOxdwvMxWs0OjA",
      privateKey: "eoaCjWxqQpr5B7Dw3DKel",
    })
    .then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
      },
      (err) => {
        console.log("FAILED...", err);
      }
    );
  res.redirect("/contact");
});

module.exports = router;
