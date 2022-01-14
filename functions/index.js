"use strict";

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

// Sends an email when a user is created
exports.accountCreate = functions.auth.user().onCreate(async (user) => {
  functions.logger.info("New user created", user);

  // Building Email message.
  const mailOptions = {
    from: gmailEmail,
    to: "michael.hoffmann@mokkapps.de",
    subject: "[GitHub Traffic Viewer] New user created",
    text: `Display Name: ${user.displayName}, Email: ${user.email}`,
  };

  try {
    await mailTransport.sendMail(mailOptions);
    functions.logger.log("Successfully sent email");
  } catch (error) {
    functions.logger.error(
        "There was an error while sending the email:",
        error,
    );
  }
});
