const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const cors = require('cors')({ origin: true });

module.exports = {
  skipTicket: functions.https.onRequest((req, res) => {
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
            const {
              currentTicket,
              endDate,
              remainingTickets,
              status,
            } = snapshot.val();

            if (status === 2 || remainingTickets === 0) {
              return res.status(400).send({
                error: `Refined ID ${id} has ended`,
              });
            }

            const now = moment();

            const estimatedDuration =
              moment.duration(moment(endDate).diff(now)).asMinutes() /
              remainingTickets;

            //eslint-disable-next-line
            return ref
              .update({
                currentTicket: {
                  estimatedDuration,
                  startDate: now.toJSON(),
                  estimatedEndDate: moment(now)
                    .add(estimatedDuration, 'minutes')
                    .toJSON(),
                  number: currentTicket.number,
                  isLastTicket: remainingTickets === 1,
                },
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
