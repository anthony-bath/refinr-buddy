const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const cors = require('cors')({ origin: true });

module.exports = {
  startRefinementSession: functions.https.onRequest((req, res) => {
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
            const { durationMinutes, tickets } = snapshot.val();
            const now = moment();
            const endDate = moment(now)
              .add(durationMinutes, 'minutes')
              .toJSON();
            const estimatedDuration = durationMinutes / tickets;

            const currentTicket = {
              estimatedDuration,
              number: 1,
              startDate: now.toJSON(),
              estimatedEndDate: moment(now)
                .add(estimatedDuration, 'minutes')
                .toJSON(),
              isLastTicket: tickets === 1,
            };

            //eslint-disable-next-line
            return ref
              .update({
                currentTicket,
                endDate,
                remainingTickets: tickets - 1,
                status: 1,
                startDate: now.toJSON(),
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
