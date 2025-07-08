require('dotenv').config();               // if you test locally with a .env file
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;    // Azure will set PORT

app.use(cors());
app.use(bodyParser.json());

const path = require("path");

// Serve static files from the React build
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/contact", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,          // e.g. smtp.gmail.com
    port: +process.env.SMTP_PORT,         // e.g. 465
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,        // your Gmail address
      pass: process.env.SMTP_PASS,        // your app‑password
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.CONTACT_RECEIVER,   // your notification address
      subject: `New Contact Form from ${firstName} ${lastName}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
      `,
    });
    res.status(200).json({ code: 200, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ code: 500, message: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
