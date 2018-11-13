const admin = require('firebase-admin');
const { createRefinementSession } = require('./createRefinementSession');
const { startRefinementSession } = require('./startRefinementSession');

admin.initializeApp();

exports.createRefinementSession = createRefinementSession;
exports.startRefinementSession = startRefinementSession;
