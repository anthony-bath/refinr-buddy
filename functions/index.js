const admin = require('firebase-admin');
const { createRefinementSession } = require('./createRefinementSession');
const { startRefinementSession } = require('./startRefinementSession');
const { nextTicket } = require('./nextTicket');
const { endRefinementSession } = require('./endRefinementSession');

admin.initializeApp();

exports.createRefinementSession = createRefinementSession;
exports.startRefinementSession = startRefinementSession;
exports.nextTicket = nextTicket;
exports.endRefinementSession = endRefinementSession;
