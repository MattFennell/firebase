/* eslint-disable max-len */
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const lodash = require('lodash');
const firestore = require('@google-cloud/firestore');
const constants = require('./src/constants');
const common = require('./src/common');

const client = new firestore.v1.FirestoreAdminClient();
const bucket = 'gs://learning-backups';

const config = functions.config();

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.auth = require('./src/auth');
exports.league = require('./src/leagues');
exports.team = require('./src/teams');
exports.player = require('./src/players');
exports.activeTeam = require('./src/activeTeam');
exports.weeklyTeam = require('./src/weeklyTeams');
exports.points = require('./src/points');
exports.users = require('./src/users');
exports.listeners = require('./src/listeners');
exports.onSignUp = require('./src/onSignUp');
exports.onDelete = require('./src/onDelete');
exports.firestore = require('./src/firestoreExports');
exports.management = require('./src/management');
exports.highlights = require('./src/highlights');
exports.fixtures = require('./src/fixtures');

const operations = admin.firestore.FieldValue;
// currently at v8.13.0 for node

// // https://firebase.google.com/docs/reference/js/firebase.functions.html#functionserrorcod

exports.setMyTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users-teams').doc(context.auth.uid).set({
            team: data.team
        });
    });

exports.getMyTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users-teams').doc(context.auth.uid).get().then(
            doc => {
                console.log('in here');
                if (doc.exists) {
                    return doc.data().team || 'No team set';
                }
                return 'No team set';
            }
        );
    });
