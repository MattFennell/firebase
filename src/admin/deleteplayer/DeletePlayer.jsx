import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import fp from 'lodash/fp';
import defaultStyles from './DeletePlayer.module.scss';
import Dropdown from '../../common/dropdown/Dropdown';
import {
    closeDeletePlayerError, fetchTeamsRequest, fetchPlayersForTeamRequest, deletePlayerRequest
} from '../actions';
import * as selectors from '../selectors';
import StyledButton from '../../common/StyledButton/StyledButton';
import ErrorModal from '../../common/modal/ErrorModal';
import Spinner from '../../common/spinner/Spinner';

const DeletePlayer = props => {
    const [playerName, setPlayerName] = useState('');
    const [playerTeam, setPlayerTeam] = useState('');

    useEffect(() => {
        props.fetchTeamsRequest();
    }, [props.fetchTeamsRequest]);

    const setTeam = useCallback(name => {
        setPlayerTeam(name);
        props.fetchPlayersForTeamRequest(name);
    }, [props.fetchPlayersForTeamRequest, playerTeam, setPlayerTeam]);

    const playersForActiveTeam = fp.getOr([], playerTeam)(props.teamsWithPlayers);

    const nameToId = name => fp.get('id')(playersForActiveTeam.find(a => a.value === name));

    const deletePlayer = useCallback(() => {
        props.deletePlayerRequest(nameToId(playerName));
    }, [playerName, props.deletePlayerRequest]);

    return (
        <div className={props.styles.deletePlayerWrapper}>
            <div className={props.styles.deletePlayerHeader}>
                <StyledButton
                    color="primary"
                    onClick={deletePlayer}
                    text="Delete Player"
                />
            </div>
            <div className={props.styles.deletePlayerForm}>
                <div className={props.styles.deletePlayerDropdowns}>
                    <Dropdown activeValue={playerTeam} onChange={setTeam} options={props.allTeams} title="Team" key="Team" />
                    <Dropdown activeValue={playerName} onChange={setPlayerName} options={playersForActiveTeam} title="Player" key="Player" />
                </div>

            </div>
            <ErrorModal
                closeModal={props.closeDeletePlayerError}
                headerMessage="Delete Player Error"
                isOpen={props.deletePlayerError.length > 0}
                errorCode={props.deletePlayerErrorCode}
                errorMessage={props.deletePlayerError}
            />

            <div className={classNames({
                [props.styles.hidden]: !props.deletingPlayer
            })}
            >
                <Spinner color="secondary" />
            </div>
        </div>
    );
};

DeletePlayer.defaultProps = {
    allTeams: [],
    styles: defaultStyles
};

DeletePlayer.propTypes = {
    allTeams: PropTypes.arrayOf(PropTypes.shape({})),
    closeDeletePlayerError: PropTypes.func.isRequired,
    deletePlayerError: PropTypes.string.isRequired,
    deletePlayerErrorCode: PropTypes.string.isRequired,
    deletePlayerRequest: PropTypes.func.isRequired,
    deletingPlayer: PropTypes.bool.isRequired,
    fetchTeamsRequest: PropTypes.func.isRequired,
    fetchPlayersForTeamRequest: PropTypes.func.isRequired,
    styles: PropTypes.objectOf(PropTypes.string),
    teamsWithPlayers: PropTypes.objectOf(PropTypes.array).isRequired
};

const mapDispatchToProps = {
    closeDeletePlayerError,
    deletePlayerRequest,
    fetchTeamsRequest,
    fetchPlayersForTeamRequest
};

const mapStateToProps = state => ({
    allTeams: selectors.getAllTeams(state),
    deletePlayerError: selectors.getDeletePlayerError(state),
    deletePlayerErrorCode: selectors.getDeletePlayerErrorCode(state),
    deletingPlayer: selectors.getDeletingPlayer(state),
    teamsWithPlayers: selectors.getTeamsWithPlayers(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeletePlayer);
