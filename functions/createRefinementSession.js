const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

module.exports = {
  createRefinementSession: functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
      const { tickets, durationMinutes } = req.body;

      if (!tickets || !durationMinutes) {
        return res.status(400).send({
          error: 'Invalid request: all required parameters not provided',
        });
      }

      const id = Math.random()
        .toString()
        .slice(2, 9);

      return admin
        .database()
        .ref(`refinement/${id}`)
        .set({
          tickets,
          durationMinutes,
          status: 0,
        })
        .then(_ => {
          return res.status(201).send({
            id,
            message: `Session created with ID ${id}`,
          });
        })
        .catch(err => {
          return res.status(400).send(err);
        });
    });
  }),
};
