const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
const cors = require('cors')({ origin: true });

module.exports = {
  getTimeDiff: functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
      const { now } = req.body;
      const clientNow = moment(now);
      const serverNow = moment();

      const diff = moment.duration(serverNow.diff(clientNow)).asSeconds();
      return res.status(200).send({ diff, serverNow: serverNow.toJSON() });
    });
  }),
};
