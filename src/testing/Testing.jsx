import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import fp from 'lodash/fp';
import lodash from 'lodash';
import defaultStyles from './Testing.module.scss';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import {
    createLeague, fetchLeagues, joinLeague, increaseScore, increaseMyScore, createTeam,
    createPlayer, fetchPlayers, addPlayerToActiveTeam, triggerWeeklyTeams, fetchWeeklyTeams,
    addPointsToPlayer, fetchWeeklyPlayersForUserForWeek, setActiveTeam, fetchMyActiveTeam,
    addPointsForTeamInWeek, fetchTeams, fetchUserMostPoints, fetchOrderedUsersInLeague,
    fetchPositionofUserInLeagues, calculatePositions
} from './actions';
import * as selectors from './selectors';

const Testing = props => {
    const [leagueName, setLeagueName] = useState('');
    const [pointsToIncrease, setPointsToIncrease] = useState(0);
    const [playerName, setPlayerName] = useState('');
    const [playerPosition, setPlayerPosition] = useState('');
    const [playerPrice, setPlayerPrice] = useState('');
    const [playerTeam, setPlayerTeam] = useState('');
    const [teamName, setTeamName] = useState('');
    const [currentWeek, setCurrentWeek] = useState(0);
    const [pointsToAddToPlayer, setPointsToAddToPlayer] = useState(0);
    const [weekToAddPointsTo, setWeekToAddPointsTo] = useState(0);
    const [playersForActiveTeam, setPlayersForActiveTeam] = useState([]);

    const [playersToRemoveFromActiveTeam, setPlayersToRemoveFromActiveTeam] = useState([]);
    const [numberOfGoals, setNumberOfGoals] = useState(0);
    const [resultObject, setResultObject] = useState({});


    useEffect(() => {
        props.fetchLeagues();
        props.fetchPlayers();
        props.fetchWeeklyTeams();
        props.fetchWeeklyPlayersForUserForWeek('replacemeinsaga', 0);
        props.fetchMyActiveTeam();
        props.fetchTeams();
        props.fetchUserMostPoints();
        props.fetchOrderedUsersInLeague();
        props.fetchPositionofUserInLeagues();
        props.calculatePositions();
    }, [props.fetchLeagues, props.fetchPlayers, props.fetchWeeklyTeams,
        props.fetchWeeklyPlayersForUserForWeek, props.fetchMyActiveTeam,
        props.fetchTeams, props.fetchUserMostPoints, props.fetchOrderedUsersInLeague,
        props.fetchPositionofUserInLeagues, props.calculatePositions]);

    const makeLeague = useCallback(() => {
        props.createLeague(leagueName);
    }, [leagueName, props]);

    const makeTeam = useCallback(() => {
        props.createTeam(teamName);
    }, [teamName, props.createTeam]);

    const makePlayer = useCallback(() => {
        props.createPlayer(playerName, playerPosition, parseInt(playerPrice, 10), playerTeam);
    }, [playerName, playerPosition, playerPrice, playerTeam, props.createPlayer]);

    const addOrRemovePlayerForActiveTeam = playerId => {
        setPlayersToRemoveFromActiveTeam(playersToRemoveFromActiveTeam.filter(x => x !== playerId));
        if (playersForActiveTeam.includes(playerId)) {
            setPlayersForActiveTeam(playersForActiveTeam.filter(x => x !== playerId));
        } else {
            setPlayersForActiveTeam(playersForActiveTeam.concat([playerId]));
        }
    };

    const doubleClickRemove = playerId => {
        setPlayersForActiveTeam(playersForActiveTeam.filter(x => x !== playerId));
        if (playersToRemoveFromActiveTeam.includes(playerId)) {
            setPlayersToRemoveFromActiveTeam(playersToRemoveFromActiveTeam.filter(x => x !== playerId));
        } else {
            setPlayersToRemoveFromActiveTeam(playersToRemoveFromActiveTeam.concat([playerId]));
        }
    };

    const addGoalToPlayer = playerId => {
        setNumberOfGoals(numberOfGoals + 1);
        setResultObject(fp.set(`${playerId}.goals`, fp.getOr(0, `${playerId}.goals`, resultObject) + 1, resultObject));
    };

    const data = [{
        data:
        {
            name: 'Google league',
            username: 'Matthew Fennell',
            start_week: 0,
            user_points: 150,
            user_id: 'DBSAz7RXYpgm7ZIusWDhrfdXb342',
            league_id: 'XzJFAlIEonl0E6eWaR0L'
        },
        id: 'LS7D9Xs9q2Ca0UwbmVly'
    },
    {
        data:
        {
            username: 'Matthew Fennell',
            start_week: 0,
            user_points: 0,
            user_id: 'DBSAz7RXYpgm7ZIusWDhrfdXb342',
            league_id: 'ltWFLS9oQM71RfRlJxMk',
            name: 'Another league'
        },
        id: 'MniBDixptkeH2hCBXSvp'
    },
    {
        data:
        {
            name: 'Google league',
            username: 'Matthew Fennell',
            start_week: 0,
            user_points: 234,
            user_id: 'fdhnXmEIvRSPyx2FQBoMOW9GFyf2',
            league_id: 'XzJFAlIEonl0E6eWaR0L'
        },
        id: 'RrTRdTCeGRP4c5ghsvnq'
    },
    {
        data:
        {
            name: 'Google league',
            username: 'Matthew Fennell',
            start_week: 0,
            user_points: 200,
            user_id: 'fdhnXmEIvRSPyx2FQBoMOW9GFyf2',
            league_id: 'XzJFAlIEonl0E6eWaR0L'
        },
        id: 'RrTRdTCeGRP4c5ghsvnq'
    },
    {
        data:
        {
            name: 'Google league',
            username: 'Matthew Fennell',
            start_week: 0,
            user_points: 212,
            user_id: 'fdhnXmEIvRSPyx2FQBoMOW9GFyf2',
            league_id: 'XzJFAlIEonl0E6eWaR0L'
        },
        id: 'RrTRdTCeGRP4c5ghsvnq'
    },
    {
        data:
        {
            name: 'Different League',
            username: 'Matthew Fennell',
            start_week: 0,
            user_points: 0,
            user_id: 'DBSAz7RXYpgm7ZIusWDhrfdXb342',
            league_id: 'NtihNW5zuqVcGkMYQSZo'
        },
        id: 'aydZ5LPWyWEX8Sn95WtU'
    }];

    const leaguesAndUsers = {};
    const positions = [];

    data.forEach(league => {
        const entry = {
            id: league.id,
            points: league.data.user_points
        };

        if (leaguesAndUsers[league.data.league_id]) {
            leaguesAndUsers[league.data.league_id].push(entry);
        } else {
            leaguesAndUsers[league.data.league_id] = [entry];
        }
    });

    Object.keys(leaguesAndUsers).forEach(key => {
        leaguesAndUsers[key] = fp.sortBy('points')(leaguesAndUsers[key]).reverse();
        leaguesAndUsers[key].forEach((pos, index) => {
            positions.push({ id: pos.id, position: index + 1 });
        });
    });

    // console.log('leagues and users', leaguesAndUsers);
    // console.log('positions', positions);

    // let test = [{ points: 5 }, { points: 10 }, { points: 7 }];

    // test = fp.sortBy('points')(test);

    // console.log('test', test);

    return (
        <div className={props.styles.testingWrapper}>
            <Button
                onClick={makeLeague}
                text="CreateLeague"
            />
            <div className={props.styles.textInputWrapper}>
                <TextInput onChange={setLeagueName} />
            </div>

            <div className={props.styles.allLeagues}>
      All leagues
                {props.allLeagues.map(league => (
                    <div role="button" tabIndex={0} key={league.id} onClick={() => props.joinLeague(league.league_id)}>
        League:
                        {' '}
                        {league.league_name}
                    </div>
                ))}
            </div>

            <div className={props.styles.myLeagues}>
        Leagues I am in
                {props.leaguesIAmIn.map(league => (
                    <>
                        <div className={props.styles.myLeagueRow} key={league.id}>
          League:
                            {' '}
                            {league.league_name}
                            {' '}
          Points:
                            {' '}
                            {league.user_points}
                            <div className={props.styles.textBoxForPoints}>
                                <Button
                                    onClick={() => props.increaseScore(parseInt(
                                        pointsToIncrease, 10
                                    ), league.league_id)}
                                    text="Add points to this league"
                                />
                            </div>
                        </div>

                    </>
                ))}
            </div>
            <div className={props.styles.addPointsText}>
                <TextInput onChange={setPointsToIncrease} />
            </div>
            <Button
                onClick={() => props.increaseMyScore(parseInt(pointsToIncrease, 10))}
                text="Add points to me"
            />

            <hr />
            <div className={props.styles.createPlayerName}>
      Create Player
                <div className={props.styles.playerNameTextbox}>
          Name:
                    {' '}
                    <TextInput onChange={setPlayerName} />
                </div>
                <div className={props.styles.playerNameTextbox}>
          Position:
                    {' '}
                    <TextInput onChange={setPlayerPosition} />
                </div>
                <div className={props.styles.playerNameTextbox}>
          Price:
                    {' '}
                    <TextInput onChange={setPlayerPrice} />
                </div>
                <div className={props.styles.playerNameTextbox}>
          Team:
                    {' '}
                    <TextInput onChange={setPlayerTeam} />
                </div>
                <Button
                    onClick={makePlayer}
                    text="Create Player"
                />
            </div>
            <hr />
            <div className={props.styles.createPlayerName}>
      Create Team
                <div className={props.styles.playerNameTextbox}>
          TeamName:
                    {' '}
                    <TextInput onChange={setTeamName} />
                </div>
                <Button
                    onClick={makeTeam}
                    text="Create Team"
                />
            </div>
            <hr />
            <div className={props.styles.allPlayers}>
                All players
                Number of players to add =
                {' '}
                {playersForActiveTeam.length}
                <br />
                Number of players to remove =
                {' '}
                {playersToRemoveFromActiveTeam.length}
                <Button
                    onClick={() => props.setActiveTeam(playersForActiveTeam, playersToRemoveFromActiveTeam)}
                    text="Set Active Team"
                />
                {props.allPlayers.map(player => (
                    <>
                        <div
                            className={classNames({
                                [props.styles.selected]: playersForActiveTeam.includes(player.id),
                                [props.styles.remove]: playersToRemoveFromActiveTeam.includes(player.id)
                            })}
                            role="button"
                            tabIndex={0}
                            key={player.id}
                            onClick={() => addOrRemovePlayerForActiveTeam(player.id)}
                            onDoubleClick={() => doubleClickRemove(player.id)}
                        >
                            {' '}
                            {player.name}
                            {', '}
                            {player.team}
                            {', '}
                            {player.position}
                            {', '}
                            {player.price}

                        </div>
                    </>
                ))}
            </div>
            <hr />
            <div className={props.styles.triggerWeeklyTeams}>
                <Button
                    onClick={() => props.triggerWeeklyTeams(parseInt(currentWeek, 10))}
                    text="Trigger Weekly Teams"
                />

                <div className={props.styles.addPointsToPlayerTextInput}>
                Points to add to player
                    <TextInput onChange={setPointsToAddToPlayer} />
                </div>
                <div className={props.styles.addPointsToPlayerTextInput}>
                Week to add points to
                    <TextInput onChange={setWeekToAddPointsTo} />
                </div>
                <div className={props.styles.triggerWeeklyTeamsInput}>
                Current week
                    {' '}
                    <TextInput onChange={setCurrentWeek} />
                </div>
            </div>
            <div className={props.styles.myActiveTeam}>
                My Active team
                Number of goals to add =
                {' '}
                {numberOfGoals}
                {props.activeTeam.map(player => (
                    <div className={props.styles.activeTeamPlayer}>
                        {player.name}
                        {', '}
                        {player.position}
                        {', '}
                        {player.price}
                        <Button
                            onClick={() => addGoalToPlayer(player.player_id)}
                            text="Add goal"
                        />
                    </div>
                ))}
                <Button
                    onClick={() => props.addPointsForTeamInWeek(props.allTeams[0].id, numberOfGoals, 0, 0, resultObject)}
                    text="Add result"
                />
            </div>
        </div>
    );
};

Testing.defaultProps = {
    activeTeam: [],
    allTeams: [],
    allLeagues: [],
    allPlayers: [],
    leaguesIAmIn: [],
    myWeeklyTeams: [],
    styles: defaultStyles
};

Testing.propTypes = {
    addPlayerToActiveTeam: PropTypes.func.isRequired,
    addPointsToPlayer: PropTypes.func.isRequired,
    activeTeam: PropTypes.arrayOf(PropTypes.shape({})),
    allLeagues: PropTypes.arrayOf(PropTypes.shape({})),
    allPlayers: PropTypes.arrayOf(PropTypes.shape({})),
    createLeague: PropTypes.func.isRequired,
    createPlayer: PropTypes.func.isRequired,
    createTeam: PropTypes.func.isRequired,
    fetchLeagues: PropTypes.func.isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    fetchWeeklyTeams: PropTypes.func.isRequired,
    increaseMyScore: PropTypes.func.isRequired,
    fetchWeeklyPlayersForUserForWeek: PropTypes.func.isRequired,
    increaseScore: PropTypes.func.isRequired,
    joinLeague: PropTypes.func.isRequired,
    leaguesIAmIn: PropTypes.arrayOf(PropTypes.shape({})),
    myWeeklyTeams: PropTypes.arrayOf(PropTypes.shape({})),
    allTeams: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string
    })),
    styles: PropTypes.objectOf(PropTypes.string),
    triggerWeeklyTeams: PropTypes.func.isRequired,
    addPointsForTeamInWeek: PropTypes.func.isRequired,
    fetchMyActiveTeam: PropTypes.func.isRequired,
    setActiveTeam: PropTypes.func.isRequired,
    fetchTeams: PropTypes.func.isRequired,
    fetchUserMostPoints: PropTypes.func.isRequired,
    fetchOrderedUsersInLeague: PropTypes.func.isRequired,
    calculatePositions: PropTypes.func.isRequired,
    fetchPositionofUserInLeagues: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    addPointsForTeamInWeek,
    addPlayerToActiveTeam,
    addPointsToPlayer,
    createLeague,
    createPlayer,
    createTeam,
    fetchLeagues,
    fetchMyActiveTeam,
    fetchPlayers,
    fetchWeeklyTeams,
    increaseMyScore,
    fetchWeeklyPlayersForUserForWeek,
    increaseScore,
    joinLeague,
    setActiveTeam,
    fetchTeams,
    triggerWeeklyTeams,
    fetchUserMostPoints,
    fetchOrderedUsersInLeague,
    fetchPositionofUserInLeagues,
    calculatePositions
};

const mapStateToProps = state => ({
    allTeams: selectors.getAllTeams(state),
    activeTeam: selectors.getActiveTeam(state),
    allLeagues: selectors.getAllLeagues(state),
    allPlayers: selectors.getAllPlayers(state),
    auth: state.firebase.auth,
    leaguesIAmIn: selectors.getLeagueIAmIn(state),
    myWeeklyTeams: selectors.getWeeklyTeams(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Testing);
