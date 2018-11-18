const admin = require('firebase-admin');
const { createRefinementSession } = require('./createRefinementSession');
const { startRefinementSession } = require('./startRefinementSession');
const { nextTicket } = require('./nextTicket');

admin.initializeApp();

exports.createRefinementSession = createRefinementSession;
exports.startRefinementSession = startRefinementSession;
exports.nextTicket = nextTicket;
