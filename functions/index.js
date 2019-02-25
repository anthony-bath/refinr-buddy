const admin = require('firebase-admin');
const { createRefinementSession } = require('./createRefinementSession');
const { startRefinementSession } = require('./startRefinementSession');
const { nextTicket } = require('./nextTicket');
const { endRefinementSession } = require('./endRefinementSession');
const { skipTicket } = require('./skipTicket');
const { getTimeDiff } = require('./getTimeDiff');

admin.initializeApp();

exports.createRefinementSession = createRefinementSession;
exports.startRefinementSession = startRefinementSession;
exports.nextTicket = nextTicket;
exports.endRefinementSession = endRefinementSession;
exports.skipTicket = skipTicket;
exports.getTimeDiff = getTimeDiff;
