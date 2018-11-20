const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const cors = require('cors')({ origin: true });

module.exports = {
  endRefinementSession: functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
      const { id } = req.body;

      if (!id) {
        return res.status(400).send({
          error: 'Invalid request: all required parameters not provided',
        });
      }

      const ref = admin.database().ref(`refinement/${id}`);

      return ref
        .once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            //eslint-disable-next-line
            return ref
              .update({
                status: 2,
                remainingTickets: 0,
                actualEndDate: moment().toJSON(),
              })
              .then(() => res.status(200).send())
              .catch(() => res.status(400).send({ error: 'Update failed' }));
          } else {
            return res.status(400).send({
              error: `Refinement ID ${id} not found`,
            });
          }
        })
        .catch(ex => {
          return res.status(400).send({ error: 'Error retrieving' });
        });
    });
  }),
};
