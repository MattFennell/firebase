import fp from 'lodash/fp';
import * as actions from './actions';

export const initialState = {
    userTeams: {}
};

const pointsReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.FETCH_USER_POINTS_FOR_WEEK_SUCCESS: {
        return fp.flow(
            fp.set(`userTeams.${action.userId}.week-${action.week}.fetched`, true),
            fp.set(`userTeams.${action.userId}.week-${action.week}.team`, action.team)
        )(state);
    }
    case actions.CANCEL_FETCHING_USER_POINTS_FOR_WEEK: {
        return fp.set(`userTeams.${action.userId}.week-${action.week}.fetching`, false)(state);
    }
    case actions.SET_USER_DETAILS_FETCHING: {
        return fp.set(`userTeams.${action.userId}.details.fetching`, true)(state);
    }
    case actions.CANCEL_FETCHING_USER_DETAILS: {
        return fp.set(`userTeams.${action.userId}.details.fetching`, false)(state);
    }
    case actions.SET_USER_DETAILS: {
        return fp.set(`userTeams.${action.userId}.details`, ({
            ...action.details,
            fetched: true
        }))(state);
    }
    case actions.FETCH_USER_POINTS_FOR_WEEK_REQUEST: {
        return fp.set(`userTeams.${action.userId}.week-${action.week}.fetching`, true)(state);
    }
    default:
        return state;
    }
};

export default pointsReducer;
