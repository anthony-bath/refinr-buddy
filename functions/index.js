const admin = require('firebase-admin');
const { createRefinementSession } = require('./createRefinementSession');

admin.initializeApp();

exports.createRefinementSession = createRefinementSession;
