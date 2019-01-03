const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.dailyCleanup = functions.https.onRequest((req, res) => {
    console.log("dupa")
    res.redirect(200);
  
  });