const admin = require('firebase-admin');

// Update the path to where you've placed your Firebase service account JSON file
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
