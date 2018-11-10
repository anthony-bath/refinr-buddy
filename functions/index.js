const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.createRefinementSession = functions.https.onRequest((req, res) => {
  const id = Math.random()
    .toString()
    .slice(2, 9);

  const { tickets, durationMinutes } = req.body;

  admin
    .database()
    .ref(`refinement/${id}`)
    .set({
      tickets,
      durationMinutes,
      startDate: Date.now(),
    })
    .then(_ => {
      return res.status(201).send();
    })
    .catch(err => {
      return res.status(400).send(err);
    });
});
