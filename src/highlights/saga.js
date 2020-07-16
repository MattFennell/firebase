import {
    all, takeEvery, put, call, select, delay
} from 'redux-saga/effects';
import * as actions from './actions';
import * as highlightsApi from './api';
import * as selectors from './selectors';
import { successDelay } from '../constants';
import { setErrorMessage } from '../errorHandling/actions';

export function* submitHighlight(api, action) {
    try {
        yield call(api.submitVideo, {
            videoId: action.videoId,
            title: action.title
        });
        yield put(actions.setSuccessMessage('Highlight successfully submitted for approval'));
        yield delay(successDelay);
        yield put(actions.closeSuccessMessage());
    } catch (error) {
        yield put(setErrorMessage('Submit Highlight Error', error));
    }
}

export function* getHighlights(api) {
    try {
        const fetchedVideos = yield select(selectors.fetchedVideos);
        if (!fetchedVideos) {
            const highlights = yield call(api.getHighlights);
            yield put(actions.fetchHighlightsSuccess(highlights));
        } else {
            yield put(actions.alreadyFetchedVideos());
        }
    } catch (error) {
        yield put(setErrorMessage('Fetching Highlight Error', error));
    }
}

export function* upvoteHighlight(api, action) {
    try {
        const result = yield call(api.upvoteHighlight, ({ highlightId: action.highlightId }));
        yield put(actions.upvoteHighlightSuccess(result));
    } catch (error) {
        yield put(setErrorMessage('Error Upvoting Highlight', error));
    }
}

export function* downvoteHighlight(api, action) {
    try {
        const result = yield call(api.downvoteHighlight, ({ highlightId: action.highlightId }));
        yield put(actions.downvoteHighlightSuccess(result));
    } catch (error) {
        yield put(setErrorMessage('Error Downvoting Highlight', error));
    }
}

export function* highlightsToBeApproved(api) {
    try {
        const alreadyFetched = yield select(selectors.fetchedApprovedVideos);
        if (!alreadyFetched) {
            const highlights = yield call(api.getHighlightsToBeApproved);
            yield put(actions.fetchUserHighlightsToBeApprovedSuccess(highlights));
        } else {
            yield put(actions.alreadyFetchedApprovedHighlights());
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Highlights For Approval', error));
    }
}

export function* rejectedHighlights(api) {
    try {
        const alreadyFetched = yield select(selectors.fetchedRejectedVideos);
        if (!alreadyFetched) {
            const highlights = yield call(api.getRejectedHighlights);
            yield put(actions.fetchRejectedHighlightsSuccess(highlights));
        } else {
            yield put(actions.alreadyFetchedRejectedVideos());
        }
    } catch (error) {
        yield put(setErrorMessage('Error Fetching Rejected Highlights', error));
    }
}

export function* addCommentToVideo(api, action) {
    try {
        const newHighlight = yield call(api.addComment, ({
            collection: 'highlights', // TO:DO Replace with constants for database collection names
            collectionId: action.videoId,
            comment: action.comment
        }));
        yield put(actions.addCommentToVideoSuccess(newHighlight));
    } catch (error) {
        yield put(setErrorMessage('Error Adding Comment', error));
    } finally {
        yield put(actions.setAddingCommentToVideo(false));
    }
}

export function* addReplyToVideo(api, action) {
    try {
        const newHighlight = yield call(api.addReply, ({
            collection: 'highlights', // TO:DO Replace with constants for database collection names
            collectionId: action.videoId,
            commentId: action.commentId,
            reply: action.reply
        }));
        yield put(actions.addReplyToVideoSuccess(newHighlight));
    } catch (error) {
        yield put(setErrorMessage('Error Replying To Comment', error));
    } finally {
        yield put(actions.setAddingCommentToVideo(false));
    }
}

export function* deleteComment(api, action) {
    try {
        yield call(api.deleteComment, {
            collection: 'highlights',
            collectionId: action.videoId,
            commentId: action.commentId
        });
        yield put(actions.deleteCommentSuccess(action.videoId, action.commentId));
    } catch (error) {
        yield put(setErrorMessage('Error Deleting Comment', error));
    }
}

export function* deleteReply(api, action) {
    try {
        yield call(api.deleteReply, {
            collection: 'highlights',
            collectionId: action.videoId,
            commentId: action.commentId,
            replyId: action.replyId
        });
        yield put(actions.deleteReplySuccess(action.videoId, action.commentId, action.replyId));
    } catch (error) {
        yield put(setErrorMessage('Error Deleting Reply', error));
    }
}

export default function* overviewSaga() {
    yield all([
        takeEvery(actions.SUBMIT_HIGHLIGHT_REQUEST, submitHighlight, highlightsApi),
        takeEvery(actions.FETCH_HIGHLIGHTS_REQUEST, getHighlights, highlightsApi),
        takeEvery(actions.UPVOTE_HIGHLIGHT_REQUEST, upvoteHighlight, highlightsApi),
        takeEvery(actions.DOWNVOTE_HIGHLIGHT_REQUEST, downvoteHighlight, highlightsApi),
        takeEvery(actions.FETCH_USER_HIGHLIGHTS_TO_BE_APPROVED_REQUEST,
            highlightsToBeApproved, highlightsApi),
        takeEvery(actions.FETCH_REJECTED_HIGHLIGHTS_REQUEST, rejectedHighlights, highlightsApi),
        takeEvery(actions.ADD_COMMENT_TO_VIDEO_REQUEST, addCommentToVideo, highlightsApi),
        takeEvery(actions.ADD_REPLY_TO_VIDEO_REQUEST, addReplyToVideo, highlightsApi),
        takeEvery(actions.DELETE_COMMENT_REQUEST, deleteComment, highlightsApi),
        takeEvery(actions.DELETE_REPLY_REQUEST, deleteReply, highlightsApi)
    ]);
}
