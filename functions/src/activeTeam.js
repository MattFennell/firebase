/* eslint-disable max-len */
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

exports.updateTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        console.log('team to set', data.newTeam);


        return db.collection('users').doc(context.auth.uid).get().then(
            user => user.data().remaining_budget
        )
            .then(userBudget => db.collection('active-teams').where('user_id', '==', context.auth.uid).get().then(
                activeTeams => {
                    if (activeTeams.size === 0) {
                        throw new functions.https.HttpsError('not-found', 'Somehow you have no active team');
                    }
                    if (activeTeams.size > 1) {
                        throw new functions.https.HttpsError('invalid-argument', 'You have multiple active teams');
                    }

                    const playerIds = activeTeams.docs[0].data().player_ids;
                    const playersBeingAdded = data.newTeam.filter(p => !playerIds.includes(p));
                    const playersBeingRemoved = playerIds.filter(p => !data.newTeam.includes(p));
                    const promises = [];

                    playersBeingAdded.map(playerId => promises.push(db.collection('players').doc(playerId).get()
                        .then(doc => {
                            if (doc.exists) return ({ data: doc.data(), id: doc.id, adding: true });
                            throw new functions.https.HttpsError('not-found', 'Invalid player ID');
                        })));

                    playersBeingRemoved.map(playerId => promises.push(db.collection('players').doc(playerId).get()
                        .then(doc => {
                            if (doc.exists) return ({ data: doc.data(), id: doc.id, adding: false });
                            throw new functions.https.HttpsError('not-found', 'Invalid player ID');
                        })));

                    return Promise.all(promises).then(players => {
                        const removedPrice = players.filter(p => !p.adding)
                            .reduce((acc, curVal) => acc + curVal.data.price, 0);
                        const addedPrice = players.filter(p => p.adding)
                            .reduce((acc, curVal) => acc + curVal.data.price, 0);
                        if (userBudget + removedPrice - addedPrice < 0) {
                            throw new functions.https.HttpsError('invalid-argument', 'Not enough $$$');
                        }
                        return userBudget + removedPrice - addedPrice;
                    }).then(
                        newBudget => {
                            const newTeamPromises = [];
                            data.newTeam.map(playerId => newTeamPromises.push(db.collection('players').doc(playerId).get()
                                .then(doc => {
                                    if (doc.exists) return ({ data: doc.data(), id: doc.id, adding: false });
                                    throw new functions.https.HttpsError('not-found', 'Invalid player ID');
                                })));
                            return Promise.all(newTeamPromises).then(players => {
                                common.teamIsValid(players);
                                return activeTeams.docs[0].ref.update({
                                    player_ids: data.newTeam
                                }).then(() => db.collection('users').doc(context.auth.uid).update({
                                    remaining_budget: newBudget
                                }));
                            });
                        }
                    );
                }
            ));
    });

exports.getActiveTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('active-teams').where('user_id', '==', context.auth.uid).get().then(
            result => {
                if (result.size === 0) {
                    throw new functions.https.HttpsError('not-found', 'Somehow you have no active team');
                }
                if (result.size > 1) {
                    throw new functions.https.HttpsError('invalid-argument', 'You have multiple active teams');
                }
                return ({ player_ids: result.docs[0].data().player_ids, captain: result.docs[0].data().captain });
            }
        )
            .then(
                result => {
                    const promises = [];
                    result.player_ids.map(playerId => promises.push(db.collection('players').doc(playerId).get()
                        .then(doc => {
                            if (doc.exists) return ({ ...doc.data(), id: doc.id });
                            throw new functions.https.HttpsError('not-found', 'Invalid player ID');
                        })));
                    return Promise.all(promises).then(
                        players => ({ captain: result.captain, players })
                    );
                }
            );
    });

exports.makeCaptain = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('active-teams').where('user_id', '==', context.auth.uid).get().then(
            result => {
                if (result.size > 1) {
                    throw new functions.https.HttpsError('invalid-argument', 'Server Error. You have multiple active teams');
                }
                if (result.size === 0) {
                    throw new functions.https.HttpsError('invalid-argument', 'Server Error. You don\'t have an active team');
                }
                return result.docs[0].ref.update({
                    captain: data.playerId
                });
            }
        );
    });
