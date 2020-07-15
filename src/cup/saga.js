/* eslint-disable max-len */
import {
    all, call, takeEvery, put
} from 'redux-saga/effects';
import * as actions from './actions';
import * as cupApi from './api';
import { setErrorMessage } from '../errorHandling/actions';

export function* fetchCup(api) {
    try {
        const cup = yield call(api.fetchCup);
        yield put(actions.fetchCupSuccess(cup || {}));
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Cup Info', error));
    } finally {
        yield put(actions.setIsFetchingCup(false));
    }
}

export default function* cupSaga() {
    yield all([
        takeEvery(actions.FETCH_CUP_REQUEST, fetchCup, cupApi)
    ]);
}
