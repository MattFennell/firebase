const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

exports.createTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        if (!data.teamName) {
            throw new functions.https.HttpsError('invalid-argument', 'Cannot have an empty team name');
        }
        const alreadyExistsRef = db.collection('teams')
            .where('team_name', '==', data.teamName);
        return alreadyExistsRef.get().then(doc => {
            if (doc.empty) {
                return db.collection('teams').add({
                    team_name: data.teamName,
                    wins: 0,
                    draws: 0,
                    losses: 0,
                    goalsFor: 0,
                    goalsAgainst: 0
                });
            }
            throw new functions.https.HttpsError('invalid-argument', 'A team with that name already exists');
        });
    });


exports.getAllTeams = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db
            .collection('teams')
            .get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })));
    });


exports.getPlayersInTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        if (!data.teamName) {
            throw new functions.https.HttpsError('invalid-argument', 'You must enter a team name');
        }
        common.isAuthenticated(context);
        return db
            .collection('players').where('team', '==', data.teamName).get()
            .then(docs => docs.docs.map(doc => ({
                name: doc.data().name,
                position: doc.data().position,
                id: doc.id
            })));
    });
